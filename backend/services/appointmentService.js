const db = require("../models");

const Op = db.Op;
const Appointment = db.Appointment;
const Availability = db.Availability;
const User = db.User;

class AppointmentService {
  // async createAppointment(data) {
  //   const availability = await Availability.findByPk(data.availability_id);
  //   if (!availability) {
  //     throw new Error("Availability not found");
  //   }
  //   const appointment = await Appointment.create(data);
  //   const updatedAvailability = await availability.update({ active: false });
  //   return appointment;
  // }

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
    const appointment = await db.sequelize.transaction(async (t) => {
      const appointment = await Appointment.create(data, { transaction: t });
      await availability.update({ active: false }, { transaction: t });
      return appointment;
    });

    return appointment;
  }

  async getUserAppointments(userId) {
    const appointments = await Appointment.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: "doctor",
          attributes: ["first_name", "last_name", "address"],
        },
        {
          model: Specialization,
          as: "specialization",
          attributes: ["area_of_specialization"],
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

  async getAllAppointments() {
    const appointments = await Appointment.findAll({
      include: [
        { model: User, as: "patient" },
        { model: User, as: "doctor" },
        { model: Availability, as: "availability" },
      ],
    });
    return appointments;
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
    const result = await Appointment.destroy({ where: { id: appointmentId } });
    if (result === 0) {
      throw new Error("Appointment not found or already deleted.");
    }
    return "Appointment deleted successfully.";
  }

  // async deleteAppointment(appointmentId) {
  //   return await db.sequelize.transaction(async (t) => {
  //     // Fetch the appointment with associated availability
  //     const appointment = await Appointment.findOne({
  //       where: { id: appointmentId },
  //       include: [{
  //         model: Availability,
  //         as: 'availability',
  //         attributes: ['id', 'availability_date', 'active']
  //       }],
  //       transaction: t
  //     });
  
  //     if (!appointment) {
  //       throw new Error("Appointment not found.");
  //     }
  
  //     const currentTime = new Date();
  //     const appointmentDate = new Date(appointment.availability.availability_date);
  
  //     // Check if the appointment date is in the future
  //     if (appointmentDate > currentTime) {
  //       // Update the availability to active: true
  //       await Availability.update(
  //         { active: true },
  //         { 
  //           where: { id: appointment.availability.id },
  //           transaction: t
  //         }
  //       );
  //     }
  
  //     // Delete the appointment
  //     await appointment.destroy({ transaction: t });
  
  //     return "Appointment deleted successfully.";
  //   });
  // }
  
  


}

module.exports = new AppointmentService();
