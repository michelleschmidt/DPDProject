db = require("../models");

const Appointment = db.Appointment;
const Availability = db.Availability;
const Doctor = db.Doctor;


class AppointmentService {

  async createAppointment(data) {
    const availability = await Availability.findByPk(data.availability_id);
    if (!availability) {
      throw new Error("Availability not found");
    }
    const appointment = await Appointment.create({data});
    return appointment;
  }
  


  async getAppointmentsByUser(userId) {
    if (!user) {
      return res.status(401).send("You must log in to view your appointments.");
    }
    try {
      const appointments = await Appointment.findAll({
        where: { user_id: userId },
      });
      return appointments;
    } catch (error) {
      throw error;
    }
  }
 // get app by doc.....not completed
  async getAppointmentsByDoctor(doctorId) {
    if (!doctor) {
      return res.status(401).send("You must log in to view your appointments.");
    }
    try {
      const appointments = await Appointment.findAll({
        where: { id: doctorId },
      });
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  async getAllAppointments() {
    try {
      const appointments = await Appointment.findAll();
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  async updateAppointment(appointmentId, updates) {
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      if (appointment) {
        return await appointment.update(updates);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(appointmentId) {
    try {
      await Appointment.destroy({ where: { appointment_id: appointmentId } });
      return "Appointment deleted successfully.";
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AppointmentService();
