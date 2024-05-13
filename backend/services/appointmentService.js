db = require("../models");

const Appointment = db.Appointment;
const Availability = db.Availability;


class AppointmentService {

  async createAppointment(data) {
    const availability = await Availability.findByPk(data.availability_id);
    if (!availability) {
      throw new Error("Availability not found");
    }
    const appointment = await Appointment.create(data);
    const updatedAvailability = await availability.update({ active: false });  
    return appointment;
  }
  

// Decide which one to use later. the findByPk or fineOne
  // async createAppointment(data) {
  //   const availability = await Availability.findOne({
  //     where: {
  //       active: true,
  //       availability_id: data.availability_id,
  //       availability: {
  //         [Op.gt]: new Date(),
  //       },
  //     },
  //   });
  //   if (!availability) {
  //     throw new Error("Availability not found");
  //   }
  //   const appointment = await Appointment.create(data);
  //   const updatedAvailability = await availability.update({ active: false });
  //   return appointment;
  // }
  


  async getAppointmentsByUser(userId) {
      const appointments = await Appointment.findAll({
        where: { user_id: userId },
      });
      return appointments;

  }
 // get app by doc.....not completed
  async getAppointmentsByDoctor(doctorId) {
      const appointments = await Appointment.findAll({
        where: { id: doctorId },
      });
      return appointments;
  }

  async getDoctorById(id) {
    const doctor = await Doctor.findByPk(id, {
      include: [Specialization],
      include: [Language],
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return doctor;
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
