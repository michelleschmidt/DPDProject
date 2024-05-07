const { Appointment, Availability, Doctor } = require("../models");

const { isLoggedIn } = require("../middleware/isLoggedIn");

class AppointmentService {
  async createAppointment(appointmentData) {
    try {
      let availability = await Availability.findOne({
        where: {
          doctor_id: appointmentData.doctor_id,
          availability_date: appointmentData.availability_date,
          availability_time: appointmentData.availability_time,
        },
      });

      if (!availability) {
        throw new Error("Appointment date not available");
      }
      const newAppointment = await Appointment.create(appointmentData);
      return newAppointment;
    } catch (error) {
      throw error;
    }
  }

  //   async createAppointment(appointmentData) {
  //     try {
  //       // Find the availability entry for the specified doctor and date/time
  //       const availability = await Availability.findOne({
  //         where: {
  //           doctor_id: appointmentData.doctor_id,
  //           date: appointmentData.availability_date,
  //           available_slots: { [Op.contains]: [appointmentData.availability_time] }
  //         }
  //       });

  //       // If no availability entry is found, throw an error
  //       if (!availability) {
  //         throw new Error("Appointment date not available");
  //       }

  //       // Create the appointment and associate it with the user and doctor
  //       const newAppointment = await Appointment.create({
  //         ...appointmentData,
  //         user_id: appointmentData.user_id,
  //         doctor_id: appointmentData.doctor_id
  //       });

  //       // Add the appointment to the doctor's appointments
  //       await availability.addAppointment(newAppointment);

  //       return newAppointment;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async getAppointmentsByUser(userId) {
    if (!isLoggedIn()) {
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
