const express = require('express');
const availabilityRouter = express.Router();
const AvailabilityController = require('../controllers/availabilityController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



availabilityRouter.post('/', isLoggedIn, roleCheck('admin'), AvailabilityController.createAvailability);

availabilityRouter.post('/doctor-create', isLoggedIn, AvailabilityController.createAvailability);

availabilityRouter.get('/:id', isLoggedIn, AvailabilityController.getAvailabilityById);

availabilityRouter.get('/doctor/availabilities', isLoggedIn, AvailabilityController.getDoctorAvailabilities);

availabilityRouter.get('/all-availabilities', isLoggedIn, roleCheck('admin'), AvailabilityController.getAllAvailabilities);

availabilityRouter.put('/:id', isLoggedIn, AvailabilityController.updateAvailability);
availabilityRouter.delete('/:id', isLoggedIn, AvailabilityController.deleteAvailability);

module.exports = availabilityRouter;
