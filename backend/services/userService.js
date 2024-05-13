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
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("email already exists");
    }
    user = await User.create({
      ...data,
      password: hashedPassword,
    });
    data.email = data.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (data.language && data.language.length > 0) {
      for (const lang of data.language) {
        const language = await Language.findOne({
          where: {
            id: lang,
          },
        });
        if (language) {
          await user.addLanguage(language);
        }
      }
    }
    if (data.specialization && data.specialization.length > 0) {
      for (const spec of data.specialization) {
        const specialization = await Specialization.findOne({
          where: {
            id: spec,
          },
        });
        if (specialization) {
          await user.addSpecialization(specialization);
        }
      }
    }
    return user;
  }




  async getUsers() {
    const user = await User.findAll();
    return user;
  }

  async getDoctors() {
    const doctors = await User.findAll({
      where: {
        role: "doctor",
      },
      include: [Specialization, Language],
    });
    if (!doctors) {
      throw new Error("No doctor found");
    }
    return doctors;
  }


  async getDoctorById(id) {
    const doctor = await User.findByPk(id, {
      include: [Specialization, Language],
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return doctor;
  }


  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      include: [Language],
    });
    return user;
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
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
