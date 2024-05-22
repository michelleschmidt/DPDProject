const { where } = require("sequelize");

db = require("../models");

const Availability = db.Availability;
class AvailabilityService {
  async createAvailability(data) {
    const availability = await Availability.create(data);
    return availability;
  }

  async getAvailabilityById(id) {
    const availability = await Availability.findByPk(id);
    if (!availability) {
      throw new Error("Availability not found");
    }
    return availability;
  }

  async getDoctorAvailabilities(doctorId) {
    const availabilities = await Availability.findAll({
      where: {
        doctor_id: doctorId,
      },
    });
    return availabilities;
  }

  async getAllAvailabilities() {
    const availabilities = await Availability.findAll();
    return availabilities;
  }

  async updateAvailability(id, updates) {
    const availability = await Availability.findByPk(id);
    if (!availability) {
      throw new Error("Availability not found");
    }
    const updatedAvailability = await availability.update(updates);
    return updatedAvailability;
  }

  async deleteAvailability(id) {
    const result = await Availability.destroy({ where: { id: id } });
    if (result === 0) {
      throw new Error("Entry not found or already deleted.");
    }
    return ("Appointment deleted successfully.");
  }

}

module.exports = new AvailabilityService();
