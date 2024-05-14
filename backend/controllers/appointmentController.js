const AppointmentService = require("../services/appointmentService");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getUserAppointments(req, res, next) {
    try {
      console.log(req.user.address)
      const appointments = await AppointmentService.getUserAppointments(
        req.user.userId
      );
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorAppointments(req, res, next) {
    try {
      const doctorId = req.user.userId;
      const appointments = await AppointmentService.getDoctorAppointments(
        doctorId
      );
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getAllAppointments(req, res, next) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async updateAppointment(req, res, next) {
    try {
      const updatedAppointment = await AppointmentService.updateAppointment(req.params.id,req.body);
      res.status(201).json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppointment(req, res, next) {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      res.sendStatus(204).send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
