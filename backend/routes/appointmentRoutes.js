// routes/appointments.js
const express = require('express');
const appointRouter = express.Router();

const AppointmentController = require("../controllers/appointmentController");


appointRouter.post("/appointments", AppointmentController.createAppointment);
appointRouter.get("/appointments/user", AppointmentController.getAppointmentsByUser);
appointRouter.get("/appointments", AppointmentController.getAllAppointments);
appointRouter.put("/appointments/:appointmentId", AppointmentController.updateAppointment);
appointRouter.delete("/appointments/:appointmentId", AppointmentController.deleteAppointment);



module.exports = appointRouter;
