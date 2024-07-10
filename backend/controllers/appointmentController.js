const AppointmentService = require("../services/appointmentService");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const userId = req.user.userId;
      const appointment = await AppointmentService.createAppointment(userId, req.body);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async createAppointmentByAdmin(req, res, next) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }
  
  async getAllAppointments(req, res, next) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }


  async getUserAppointments(req, res, next) {
    try {
      const userId = req.user.userId;
      const appointments = await AppointmentService.getUserAppointments(userId);
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getUserDoctors(req, res, next) {
    try {

      const userId = req.params.id;;
      const appointments = await AppointmentService.getUserDoctors(userId);
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getUserAppointmentsByAdmin(req, res, next) {
    try {

      const userId = req.params.id;

      const appointments = await AppointmentService.getUserAppointments(userId);
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }
  async getDoctorAppointmentsByAdmin(req, res, next) {
    try {
      const doctorId = req.params.id;
      const appointments = await AppointmentService.getDoctorAppointments(
        doctorId
      );
      res.status(201).json(appointments);
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
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorPatients(req, res, next) {
    try {
      const doctorId = req.params.id;
      const appointments = await AppointmentService.getDoctorPatients(
        doctorId
      );
      res.status(201).json(appointments);
    } catch (error) {
      next(error);
    }
  }


  async updateAppointment(req, res, next) {
    try {
      const updatedAppointment = await AppointmentService.updateAppointment(
        req.params.id,
        req.body
      );
      res.status(201).json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppointment(req, res, next) {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
