// routes/appointments.js
const express = require('express');
const appointmentRouter = express.Router();

const appointmentController = require("../controllers/appointmentController");


appointmentRouter.post("/appointments", appointmentController.createAppointment);

appointmentRouter.get("/appointments/user", appointmentController.getAppointmentsByUser);
appointmentRouter.get("/appointments", appointmentController.getAllAppointments);
appointmentRouter.put("/appointments/:id", appointmentController.updateAppointment);
appointmentRouter.delete("/appointments/:id", appointmentController.deleteAppointment);



module.exports = appointmentRouter;
