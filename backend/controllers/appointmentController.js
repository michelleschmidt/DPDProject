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

  async getAppointmentsByUser(req, res, next) {
    try {
      const userId = req.user.id;
      const appointments = await AppointmentService.getAppointmentsByUser(userId);
      res.json(appointments);
    } catch (error) {
      next(error); 
    }
  }


  async getAppointmentsByDoctor(req, res) {
    try {
      const doctorId = req.doctor.doctor_id;
      const appointments = await AppointmentService.getAppointmentsByDoctor(
        doctorId
      );
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
      const updatedAppointment = await AppointmentService.updateAppointment(
        appointmentId,
        appointmentData
      );
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



  


//   async getAppointmentsByDoctor(req, res, next) {
//     try {
//       const doctorId = req.doctor.doctor_id;
//       const appointments = await AppointmentService.getAppointmentsByDoctor(doctorId);
//       res.json(appointments);
//     } catch (error) {
//       next(error); // Use the next middleware to handle errors centrally
//     }
//   }

//   async getAllAppointments(req, res, next) {
//     try {
//       const appointments = await AppointmentService.getAllAppointments();
//       res.json(appointments);
//     } catch (error) {
//       next(error); // Use the next middleware to handle errors centrally
//     }
//   }

//   async updateAppointment(req, res, next) {
//     try {
//       const appointmentId = req.params.appointmentId; // Use params for IDs
//       const appointmentData = req.body;
//       const updatedAppointment = await AppointmentService.updateAppointment(appointmentId, appointmentData);
//       res.json(updatedAppointment);
//     } catch (error) {
//       next(error); // Use the next middleware to handle errors centrally
//     }
//   }

//   async deleteAppointment(req, res, next) {
//     try {
//       const appointmentId = req.params.appointmentId;
//       const result = await AppointmentService.deleteAppointment(appointmentId);
//       res.send(result);
//     } catch (error) {
//       next(error); // Use the next middleware to handle errors centrally
//     }
//   }
}

module.exports = new AppointmentController();
