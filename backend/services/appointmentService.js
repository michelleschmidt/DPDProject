const db = require("../models");

const Op = db.Op;
const Appointment = db.Appointment;
const Availability = db.Availability;
const Specialization = db.Specialization;
const User = db.User;
const Language = db.Language;

class AppointmentService {
  async createAppointment(data) {
    const currentTime = new Date();

    const availability = await Availability.findOne({
      where: {
        id: data.availability_id,
        doctor_id: data.doctor_id,
        active: true,
        availability_date: {
          [Op.gt]: currentTime,
        },
      },
    });

    if (!availability) {
      throw new Error(
        "No active availability found for the given doctor and time slot."
      );
    }

    return db.sequelize.transaction(async (t) => {
      const appointment = await Appointment.create(data, { transaction: t });
      await availability.update({ active: false }, { transaction: t });
      return appointment;
    });
  }

  async getAllAppointments() {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: "patient",
          attributes: ["id","title", "first_name", "last_name", "address"],
        },
        {
          model: User,
          as: "doctor",
          attributes: ["id", "title", "first_name", "last_name", "address"],
          include: [
            {
              model: Specialization,
              as: "specialization",
              attributes: ["area_of_specialization"],
            },
          ],
        },
        {
          model: Availability,
          as: "availability",
          attributes: ["availability_date", "active"],
        },
      ],
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointmentDate: appointment.availability.availability_date,
      appointmentReason: appointment.appointment_reason,
      bookTranslation: appointment.book_translation,
      completed: appointment.completed,
    }));
  }

  async getUserAppointments(userId) {
    const appointments = await Appointment.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: "doctor",
          attributes: ["title", "first_name", "last_name", "address"],
          include: [
            {
              model: Specialization,
              as: "specialization",
              attributes: ["area_of_specialization"],
            },
          ],
        },
        {
          model: Availability,
          as: "availability",
          attributes: ["availability_date"],
        },
      ],
    });
    return appointments;
  }

  async getDoctorAppointments(doctorId) {
    const appointments = await Appointment.findAll({
      where: { doctor_id: doctorId },
      include: [
        {
          model: User,
          as: "patient",
          attributes: ["title", "first_name", "last_name", "address"],
        },
        {
          model: Availability,
          as: "availability",
          attributes: ["availability_date"],
        },
      ],
    });
    return appointments;
  }


  async getUserDoctors(userId) {
    const appointments = await Appointment.findAll({
      where: { user_id: userId },
      include: [{
        model: User,
        as: 'doctor',
        attributes: ['id', 'title', 'first_name', 'last_name'],
        include: [
          { model: Specialization, as: "specialization", attributes: ["area_of_specialization"] },
          { model: Language, as: "languages", attributes: ["language_name"], through: { attributes: [] } }
        ]
      }],
      raw: false,
      nest: true
    });
  
    const doctorsMap = new Map();
    appointments.forEach(a => {
      const doctor = a.doctor;
      if (!doctorsMap.has(doctor.id)) {
        doctorsMap.set(doctor.id, {
          id: doctor.id,
          doctor_name: `${doctor.title} ${doctor.first_name} ${doctor.last_name}`.trim(),
          area_of_specialization: doctor.specialization?.area_of_specialization,
          languages: doctor.languages?.map(l => l.language_name) || []
        });
      }
    });
  
    return Array.from(doctorsMap.values());
  }
  
  
  
  
  
  // async getUserDoctors(userId) {
  //   const doctors = await Appointment.findAll({
  //     where: { user_id: userId },
  //     attributes: [],
  //     include: [{
  //       model: User,
  //       as: 'doctor',
  //       attributes: [
  //         'id',
  //         [db.sequelize.literal("CONCAT(doctor.title, ' ', doctor.first_name, ' ', doctor.last_name)"), "doctor_name"]
  //       ],
  //       include: [{
  //         model: Specialization,
  //         as: "specialization",
  //         attributes: ["area_of_specialization"]
  //       },
  //       {
  //         model: Language,
  //         attributes: ["language_name"], // Only include language_name
  //         through: { attributes: [] }, // Exclude attributes from the junction table
  //       },
  //     ]
  //     }],
  //     raw: true,
  //     nest: true
  //   });
  
  //   return doctors.map(({ doctor, ...appointment }) => ({
  //     id: doctor.id,
  //     doctor_name: doctor.doctor_name,
  //     area_of_specialization: doctor.specialization.area_of_specialization,
  //     ...appointment
  //   }));
    
  // }
  

  async getDoctorPatients(doctorId) {
    const appointments = await Appointment.findAll({
        where: { doctor_id: doctorId },
        attributes: ['appointment_reason'],
        include: [
            {
                model: User,
                as: 'patient',
                attributes: [ 'id',
                    [db.sequelize.literal("CONCAT(title, ' ', patient.first_name, ' ', patient.last_name)"), "patient_name"],
                    'accessibility_needs'
                ]
            }
        ],
        raw: true,
        nest: true
    });

    // Process the results to group by patient
    const groupedPatients = appointments.reduce((acc, appointment) => {
        const patientKey = appointment.patient.patient_name;
        if (!acc[patientKey]) {
            acc[patientKey] = {
                patient: {
                    patient_name: appointment.patient.patient_name,
                    accessibility_needs: appointment.patient.accessibility_needs
                },
                appointment_reasons: []
            };
        }
        acc[patientKey].appointment_reasons.push(appointment.appointment_reason);
        return acc;
    }, {});

    // Convert the grouped object into an array
    const result = Object.values(groupedPatients);
    
    return result;
}

  
  
  
  async updateAppointment(appointmentId, updates) {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    await appointment.update(updates);
    return appointment;
  }

  async deleteAppointment(appointmentId) {
    return db.sequelize.transaction(async (t) => {
      const appointment = await Appointment.findByPk(appointmentId, {
        include: [{ model: Availability, as: "availability" }],
        transaction: t,
      });
      if (!appointment) {
        throw new Error("Appointment not found or already deleted.");
      }
      if (!appointment.availability) {
        throw new Error(
          "Associated availability not found for this appointment."
        );
      }
      const appointmentDate = new Date(
        appointment.availability.availability_date
      );
      if (appointmentDate > new Date()) {
        await Availability.update(
          { active: true },
          {
            where: { id: appointment.availability_id },
            transaction: t,
          }
        );
      }
      await appointment.destroy({ transaction: t });
      return "Appointment deleted successfully.";
    });
  }
}

module.exports = new AppointmentService();
