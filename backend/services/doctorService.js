const { Doctor, Specialization, Language } = require("../models");

class DoctorService {
  async createDoctor(doctorData) {
    const doctor = await Doctor.create(doctorData);
    await doctor.addSpecializations(doctorData.specialization);
    return doctor;
  }


  
  async findNearbyDoctors(userLocation, radiusInMeters, language, specialization) {
    return sequelize.models.doctor.findAll({
      where: {
        location: {
          [Sequelize.Op.within]: sequelize.literal(`ST_MakeEnvelope(${userLocation.coordinates[0]} - ${radiusInMeters / 1000}, ${userLocation.coordinates[1]} - ${radiusInMeters / 1000}, ${userLocation.coordinates[0]} + ${radiusInMeters / 1000}, ${userLocation.coordinates[1]} + ${radiusInMeters / 1000}, 4326)`),
        },
        // Add any additional filtering based on language and specialisation if needed
      },
    });
  }

  async getAllDoctors() {
    return await Doctor.findAll({
      include: [Specialization],
      include: [Language],
    });
  }

  async getDoctorById(id) {
    const doctor = await Doctor.findByPk(id, {
      include: [Specialization],
      include: [Language],
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return doctor;
  }

  async updateDoctor(id, updates) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await doctor.update(updates);
    await doctor.setSpecializations(updates.specializations);
    return doctor;
  }

  async deleteDoctor(id) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await doctor.destroy();
  }
}

module.exports = new DoctorService();
