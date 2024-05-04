// In the doctorController.js file
const specialization = require("../models/specialization");
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



  async search(req, res) {
    try {
      const { address, radius } = req.query;

      // Perform geocoding to convert the address into geographic coordinates
      const geocodingResponse = await axios.get(
        "http://api.positionstack.com/v1/forward",
        {
          params: {
            access_key: process.env.ACCESS_KEY,
            query: address,
          },
        }
      );

      const lat = geocodingResponse.data.data[0].latitude;
      const lng = geocodingResponse.data.data[0].longitude;

      const userLocation = {
        type: "Point",
        coordinates: [lng, lat],
      };

      // Parse the radius value as a number and convert to meters
      const radiusInMeters = parseInt(radius) * 1000;

      const doctors = await service.findNearbyDoctors(
        userLocation,
        radiusInMeters,
        language,
        specialization
      );

      res.status(200).json(doctors);
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
      res.json({ message: "Doctor deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DoctorController();
