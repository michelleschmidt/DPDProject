const AvailabilityService = require('../services/availabilityService');


class AvailabilityController {

    async createAvailability(req, res) {
        try {
          const availability = await AvailabilityService.createAvailability(req.body);
          res.status(201).json(availability);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

      async getAvailabilityById(req, res) {
        try {
          const availability = await AvailabilityService.getAvailabilityById(req.body.availability_id);
          if (availability) {
            res.status(200).json(availability);
          } else {
            res.status(404).send('No Availability found');
          }
        } catch (error) {
          res.status(500).send(error.message);
        }
      }

      async getDoctorsAvailability(req, res) {
        try {
          const availabilities = await AvailabilityService.getDoctorsAvailability(req.body.doctor_id);
          res.status(200).json(availabilities);
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
    
      async getAllAvailabilities(req, res) {
        try {
          const availabilities = await AvailabilityService.getAllAvailabilities();
          res.status(200).json(availabilities);
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
    
      async updateAvailability(req, res) {
        try {
          const updatedAvailability = await AvailabilityService.updateAvailability(req.body.availability_id, req.body);
          if (updatedAvailability) {
            res.status(200).json(updatedAvailability);
          } else {
            res.status(404).send('Availability not found');
          }
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
      async deleteAvailability(req, res) {
        try {
          const result = await AvailabilityService.deleteAvailability(req.body.availability_id);
          if (result) {
            res.status(200).json({ message: 'Availability deleted successfully' });
          } else {
            res.status(404).send('Availability not found');
          }
        } catch (error) {
          res.status(500).send(error.message);
        }
      }
  }
  
  module.exports = new AvailabilityController();
  


