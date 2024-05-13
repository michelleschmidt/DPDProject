// routes/appointments.js
const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");

appointmentRouter.post("/create-new", isLoggedIn, appointmentController.createAppointment);

appointmentRouter.get("/user/appointments", appointmentController.getAppointmentsByUser);
appointmentRouter.get("/", isLoggedIn, appointmentController.getAllAppointments);

appointmentRouter.put("/:id", isLoggedIn, appointmentController.updateAppointment);
appointmentRouter.delete("/:id", isLoggedIn, appointmentController.deleteAppointment);



module.exports = appointmentRouter;