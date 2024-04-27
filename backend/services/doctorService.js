
const { Doctor, Specialization } = require('../models');

class DoctorService {
  async createDoctor(doctorData) {
    const doctor = await Doctor.create(doctorData);
    await doctor.addSpecializations(doctorData.specializations);
    return doctor;
  }

  async getAllDoctors() {
    return await Doctor.findAll({
      include: [Specialization],
    });
  }

  async getDoctorById(id) {
    const doctor = await Doctor.findByPk(id, {
      include: [Specialization],
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async updateDoctor(id, updates) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await doctor.update(updates);
    await doctor.setSpecializations(updates.specializations);
    return doctor;
  }

  async deleteDoctor(id) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await doctor.destroy();
  }
}

module.exports = new DoctorService();
