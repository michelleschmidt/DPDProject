const db = require("../models");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.User;
const Specialization = db.Specialization;
const Language = db.Language;

class AuthService {
  // async register(data) {

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

  async register(data) {
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
      if (data.specialization && data.specialization.length > 0) {
        const specializations = await Specialization.findAll({
          where: {
            id: data.specialization,
          },
        });
        await user.addSpecializations(specializations, { transaction: t });
      }

      return user;
    });
  }


  async login(data) {
    data.email = data.email.toLowerCase();
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new Error("user does not exist");

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        role: user.dataValues.role,
        address: user.dataValues.address,
      },
      process.env.SECRETE,
      { expiresIn: "24h" }
    );
    return {
      user,
      token,
    };
  }

  async doctorLogin(data) {
    data.email = data.email.toLowerCase();
    const doctor = await Doctor.findOne({
      where: {
        email: data.email,
      },
    });
    if (!doctor) throw new Error("user does not exist");

    const validPassword = await bcrypt.compare(data.password, doctor.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        doctorId: doctor.dataValues.doctor_id,
        role: doctor.dataValues.role,
        address: doctor.dataValues.address,
      },
      process.env.SECRETE,
      { expiresIn: "24h" }
    );
    return {
      doctor,
      token,
    };
  }
}

module.exports = new AuthService();
