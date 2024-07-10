// routes/appointments.js
const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



appointmentRouter.get("/", isLoggedIn, roleCheck('admin'), appointmentController.getAllAppointments);
appointmentRouter.post("/new", isLoggedIn, appointmentController.createAppointment);

appointmentRouter.post("/create-new", isLoggedIn, roleCheck('admin'), appointmentController.createAppointmentByAdmin);

appointmentRouter.get("/user-appointments", isLoggedIn, appointmentController.getUserAppointments);

appointmentRouter.get("/doctor-appointments", isLoggedIn, appointmentController.getDoctorAppointments);

appointmentRouter.get("/doctor-patients/:id", isLoggedIn, appointmentController.getDoctorPatients);

appointmentRouter.get("/user-doctors/:id", isLoggedIn, appointmentController.getUserDoctors);

appointmentRouter.get("/user/:id", isLoggedIn, roleCheck('admin'), appointmentController.getUserAppointmentsByAdmin);

appointmentRouter.get("/doctor/:id", isLoggedIn, roleCheck('admin'), appointmentController.getDoctorAppointmentsByAdmin);

appointmentRouter.put("/:id", isLoggedIn, appointmentController.updateAppointment);

appointmentRouter.delete("/:id", isLoggedIn, appointmentController.deleteAppointment);



module.exports = appointmentRouter;
