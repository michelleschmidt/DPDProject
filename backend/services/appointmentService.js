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
        active: true,
        availability: {
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
        { model: User, as: "doctor",
        attributes: ['first_name', 'last_name', 'address'], },
        {
          model: db.Availability,
          as: "availability",
          attributes: ['availability_date'],
        },
      ],
    });
    return appointments;
  }

  async getDoctorAppointments(doctorId) {
    const appointments = await Appointment.findAll({
      where: { doctor_id: doctorId },
      include: [
        { model: User, as: "patient",
        attributes: ['first_name', 'last_name', 'address'], },
        { model: Availability, as: "availability",
        attributes: ['availability_date'], },
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
    return await appointment.update(updates);
  }

  async deleteAppointment(appointmentId) {
    const result = await Appointment.destroy({ where: { id: appointmentId } });
    if (result === 0) {
      throw new Error("Appointment not found or already deleted.");
    }
    return "Appointment deleted successfully.";
  }
}

module.exports = new AppointmentService();
