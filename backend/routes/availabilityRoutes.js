const express = require('express');
const availabilityRouter = express.Router();
const AvailabilityController = require('../controllers/availabilityController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



availabilityRouter.post('/', AvailabilityController.createAvailability);

availabilityRouter.get('/:id', AvailabilityController.getAvailabilityById);

availabilityRouter.get('/:doctorId/availabilities', AvailabilityController.getDoctorsAvailability);

availabilityRouter.get('/availabilities', roleCheck('admin'), AvailabilityController.getAllAvailabilities);

availabilityRouter.put('/:id', AvailabilityController.updateAvailability);
availabilityRouter.delete('/:id', AvailabilityController.deleteAvailability);

module.exports = availabilityRouter;
