const AppointmentService = require("../services/appointmentService")
const availability = require("./availabilityController")
class AppointmentController {

  async createAppointment(req, res, next) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
      if (appointment) {
        await availability.update({ active: false });       
       }
    } catch (error) {
      next(error);
    }
  }



  async createAppointment(req, res) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      
      // Assuming doctor_id is passed in the request body to identify the correct availability
      const availability = await Availability.findOne({
        where: { doctor_id: req.body.doctor_id, availability: req.body.availability }
      });
  
      if (availability) {
        availability.available = false;
        await availability.save();
      }
  
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  

  async getAppointmentsByUser(req, res) {
    try {
      const userId = req.user.user_id;
      const appointments = await AppointmentService.getAppointmentsByUser(userId);
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAppointmentsByDoctor(req, res) {
    try {
      const doctorId = req.doctor.doctor_id;
      const appointments = await AppointmentService.getAppointmentsByDoctor(doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



  async getAllAppointments(req, res) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateAppointment(req, res) {
    try {
      const appointmentId = req.body.appointment_id;
      const appointmentData = req.body;
      const updatedAppointment = await AppointmentService.updateAppointment(appointmentId, appointmentData);
      res.json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteAppointment(req, res) {
    try {
      const appointmentId = req.params.appointmentId;
      const result = await AppointmentService.deleteAppointment(appointmentId);
      res.send(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AppointmentController();
