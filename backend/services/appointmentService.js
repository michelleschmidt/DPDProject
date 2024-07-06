const db = require("../models");

const Op = db.Op;
const Appointment = db.Appointment;
const Availability = db.Availability;
const Specialization = db.Specialization;
const User = db.User;

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
          attributes: ["id", "first_name", "last_name", "address"],
        },
        {
          model: User,
          as: "doctor",
          attributes: ["id", "first_name", "last_name", "address"],
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
          attributes: ["first_name", "last_name", "address"],
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
          attributes: ["first_name", "last_name", "address"],
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

  // async getUserDoctors(userId) {
  //   const appointments = await Appointment.findAll({
  //     where: { user_id: userId },
  //     attributes: [],
  //     include: [
  //       {
  //         model: User,
  //         as: "doctor",
  //         attributes: [
  //           [
  //             db.sequelize.literal(
  //               "CONCAT(title, ' ', doctor.first_name, ' ', doctor.last_name)"
  //             ),
  //             "doctor_name",
  //           ],
  //         ],
  //         include: [
  //           {
  //             model: Specialization,
  //             as: "specialization",
  //             attributes: ["area_of_specialization"],
  //           },
  //         ],
  //       },
  //     ],
  //     group: [
  //       "doctor.id",
  //       "doctor.title",
  //       "doctor.first_name",
  //       "doctor.last_name",
  //       "doctor.specialization.area_of_specialization",
  //     ],
  //     raw: true,
  //     nest: true,
  //   });

  //   return appointments;
  // }



  async getUserDoctors(userId) {
    const doctors = await User.findAll({
      attributes: [
        [db.sequelize.literal("CONCAT(title, ' ', first_name, ' ', last_name)"), "doctor_name"],
      ],
      include: [
        {
          model: Appointment,
          where: { user_id: userId },
          attributes: [],
          required: true
        },
        {
          model: Specialization,
          as: "specialization",
          attributes: ["area_of_specialization"],
        },
      ],
      group: ['User.id', 'specialization.area_of_specialization'],
      raw: true,
      nest: true
    });
  
    return doctors;
  }

  
  // async getDoctorPatients(doctorId) {
  //   const appointments = await Appointment.findAll({
  //     where: { doctor_id: doctorId },
  //     attributes: ['appointment_reason'],
  //     include: [
  //       {
  //         model: User,
  //         as: 'patient',
  //         attributes: [[db.sequelize.literal("CONCAT(title, ' ', patient.first_name, ' ', patient.last_name)"), "patient_name"], 'accessibility_needs'
  //         ]
  //       }
  //     ],
  //     group: [
  //       'patient.id',
  //       'patient.title',
  //       'patient.first_name',
  //       'patient.last_name',
  //       'patient.accessibility_needs',
  //       'appointment.appointment_reason'
  //     ],
  //     raw: true,
  //     nest: true
  //   });

  //   return appointments;
  // }

  async getDoctorPatients(doctorId) {
    const appointments = await Appointment.findAll({
        where: { doctor_id: doctorId },
        attributes: ['appointment_reason'],
        include: [
            {
                model: User,
                as: 'patient',
                attributes: [
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
