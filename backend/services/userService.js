const db = require("../models");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCoordinates } = require("../utils");

const User = db.User;
const Specialization = db.Specialization;
const Language = db.Language;

class UserService {
  // async createUser(data) {
  //   let user = await User.findOne({ where: { email: data.email } });
  //   if (user) {
  //     throw new Error("email already exists");
  //   }
  //   data.email = data.email.toLowerCase();
  //   const hashedPassword = await bcrypt.hash(data.password, 10);
  //   user = await User.create({
  //     ...data,
  //     password: hashedPassword,
  //   });

  //   return user;
  // }


  async createUser(data) {
    data.email = data.email.toLowerCase();
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Creating the user within a transaction to ensure data is saved correctly
    // into all tables at once
    return await db.sequelize.transaction(async (t) => {
      user = await User.create(data, { transaction: t });

      if (data.language && data.language.length > 0) {
        const languages = await Language.findAll({
          where: {
            id: data.language,
          },
        });
        await user.addLanguages(languages, { transaction: t });
      }
      data.specialization_id = await Specialization.findOne({
          where: {
            id: data.specialization_id,
          },
        });
      return user;
    });
  }

  async getUsers() {
    const user = await User.findAll({
      include: [
        { model: Language,
          attributes: ['language_name'], }
      ]});
    
    return user;
  }

  async getDoctors() {
    const doctors = await User.findAll({
      where: {
        role: "doctor",
      },
      include: [
        { model: Specialization,
          attributes: ['area_of_specialization'], },
        { model: Language,
          attributes: ['language_name'], }
      ]
    });
    if (!doctors) {
      throw new Error("No doctor found");
    }
    return doctors;
  }


  async getDoctorById(id) {
    const doctor = await User.findByPk(id, {
      include: [
        { model: Specialization,
          attributes: ['area_of_specialization'], },
        { model: Language,
          attributes: ['language_name'], }
      ]
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
  //  return doctor;
  const processedDoctor = doctor.toJSON();
  processedDoctor.languages = processedDoctor.languages.map(language => language.language_name);

  return processedDoctor;
  }


  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      include: [Language],
    });
   // return user;
    const processedUser = user.toJSON();
    processedUser.languages = processedUser.languages.map(language => language.language_name);
  
    return processedUser;
  }

  // used in verifying logged-in user
  async findOne(data) {
    const user = await User.findOne(data);
    return user;
  }

  async updateUser(userId, updates) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    updates.email = updates.email.toLowerCase();
    await user.update(updates);
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return ("User deleted successfully") ;
  }
}

module.exports = new UserService();
