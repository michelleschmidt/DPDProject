
const DoctorService = require("../services/doctorService");

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



  async findDoctorByLanguageAndSpecialization(req, res) {
    try {
      const doctors = await DoctorService.getAllDoctors({
        include: [
          {
            model: Language,
            where: { id: req.query.language_id },
          },
          {
            model: Specialization,
            where: { id: req.query.specialization_id },
          },
        ],
      });
      res.send(doctors);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  async findOne(req, res) {
    try {
      const doctor = await DoctorService.getDoctorById(req.body.id);
      res.json(doctor);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const doctor = await DoctorService.updateDoctor(req.body.id, req.body);
      res.json(doctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await DoctorService.deleteDoctor(req.body.id);
      res.json({ message: "Doctor deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DoctorController();
