const express = require('express');
const availabilityRouter = express.Router();
const AvailabilityController = require('../controllers/availabilityController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



availabilityRouter.post('/', isLoggedIn, roleCheck('admin'), AvailabilityController.createAvailability);

availabilityRouter.post('/availability-create', isLoggedIn, AvailabilityController.createAvailability);

availabilityRouter.get('/all-availabilities', isLoggedIn, roleCheck('admin'), AvailabilityController.getAllAvailabilities);

availabilityRouter.get('/doctor-availabilities', isLoggedIn, AvailabilityController.getDoctorAvailabilities);


availabilityRouter.get('/doctor/:doctor_id', isLoggedIn, AvailabilityController.getDoctorAvailabilitiesByUser);

availabilityRouter.get('/:id', isLoggedIn, AvailabilityController.getAvailabilityById);


availabilityRouter.put('/:id', isLoggedIn, AvailabilityController.updateAvailability);
availabilityRouter.delete('/:id', isLoggedIn, AvailabilityController.deleteAvailability);

module.exports = availabilityRouter;
