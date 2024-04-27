// In the doctorController.js file
const DoctorService = require('../services/doctorService');

class DoctorController {
  async create(req, res) {
    try {
      const doctor = await DoctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const doctors = await DoctorService.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findOne(req, res) {
    try {
      const doctor = await DoctorService.getDoctorById(req.params.id);
      res.json(doctor);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const doctor = await DoctorService.updateDoctor(req.params.id, req.body);
      res.json(doctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await DoctorService.deleteDoctor(req.params.id);
      res.json({ message: 'Doctor deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DoctorController();
