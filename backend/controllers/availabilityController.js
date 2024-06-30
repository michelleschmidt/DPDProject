const AvailabilityService = require('../services/availabilityService');


class AvailabilityController {

    async createAvailability(req, res, next) {
        try {
          const availability = await AvailabilityService.createAvailability(req.body);
          res.status(201).json(availability);
        } catch (error) {
          next(error);
        }
      }
      async createAvailabilityByDoctor(req, res, next) {
        try {
          req.body.doctor_id = req.user.userId;
          const availability = await AvailabilityService.createAvailabilityByDoctor(req.body);
          res.status(201).json(availability);
        } catch (error) {
          next(error);
        }
      }
      
      async getAvailabilityById(req, res, next) {
        try {
          const availability = await AvailabilityService.getAvailabilityById(req.params.id);
            res.status(200).json(availability);
        } catch (error) {
          next(error);
        }
      }

      async getDoctorAvailabilities(req, res, next) {
        try {
          const availabilities = await AvailabilityService.getDoctorAvailabilities(req.user.userId);
          res.status(200).json(availabilities);
        } catch (error) {
          next(error);
        }
      }
    
      async getAllAvailabilities(req, res, next) {
        try {
          const availabilities = await AvailabilityService.getAllAvailabilities();
          res.status(200).json(availabilities);
        } catch (error) {
          next(error);
        }
      }
    
      async updateAvailability(req, res, next) {
        try {
          const updatedAvailability = await AvailabilityService.updateAvailability(req.params.id, req.body);
            res.status(200).json(updatedAvailability);
        } catch (error) {
          next(error);
        }
      }

      async deleteAvailability(req, res, next) {
        try {
          const result = await AvailabilityService.deleteAvailability(req.params.id);
          res.status(200).json({ message: result });
        } catch (error) {
          next(error);
        }
      }
  }
  
  module.exports = new AvailabilityController();
  


