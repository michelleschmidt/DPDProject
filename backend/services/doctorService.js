db = require("../models");

const Doctor = db.Doctor;
const Specialization = db.Specialization;
const Language = db.Language;

class DoctorService {
  async createDoctor(doctorData) {
    let doctor = await Doctor.findOne({ where: { email: doctorData.email } });

    if (doctor) {
      throw new Error("email already exists");
    }
    const hashedPassword = await bcrypt.hash(doctorData.password, 10);

    // ToDo: set up the location coordinates
    // const { postcode, street, city, state, country } = doctorData;
    //  const coordinates = await getCoordinates(postcode, street, city, state, country);
    // doctorData.location = sequelize.literal(`ST_GeomFromText('POINT(${coordinates.lng} ${coordinates.lat})')`);
    //  console.log("we got here again")

    doctor = await Doctor.create({ ...doctorData, password: hashedPassword });

    // Assuming doctorData.languages is either a single language ID or an array of language IDs
    if (doctorData.language && doctorData.language.length > 0) {
      for (const lang of doctorData.language) {
        const language = await Language.findOne({
          where: {
            language_id: lang,
          },
        });
        if (language) {
          await doctor.addLanguage(language);
        }
      }
    }

    if (doctorData.specialization && doctorData.specialization.length > 0) {
      for (const spec of doctorData.specialization) {
        const specialization = await Specialization.findOne({
          where: {
            specialization_id: spec,
          },
        });
        if (specialization) {
          await doctor.addSpecialization(specialization);
        }
      }
    }
    return doctor;
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
    await doctor.setLanguages(updates.languages);
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
