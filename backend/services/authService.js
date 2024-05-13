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

  // async register(data) {
  //   let user = await User.findOne({ where: { email: data.email } });
  //   if (user) {
  //     throw new Error("email already exists");
  //   }
  //   data.email = data.email.toLowerCase();
  //   const hashedPassword = await bcrypt.hash(data.password, 10);
  //   user = await User.create(
  //     {
  //       ...data,
  //       password: hashedPassword,
  //     },
  //     {
  //       include: [Specialization, Language],
  //     });

  //   return user;
  // }




  async register(data) {
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("email already exists");
    }
    data.email = data.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    user = await User.create({
        ...data,
        password: hashedPassword,
    });
    const languages = await Promise.all(
        data.languages.map(languageId => Language.findOrCreate({where: {id: languageId}}))
    );

    const specializations = await Promise.all(
        data.specializations.map(specId => Specialization.findOrCreate({where: {id: specId}}))
    );
    await user.addLanguages(languages.map(lang => lang[0]));
    await user.addSpecializations(specializations.map(spec => spec[0]));
    return user;
}







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
  //   if (data.language && data.language.length > 0) {
  //     for (const lang of data.language) {
  //       const language = await Language.findOne({
  //         where: {
  //           id: lang,
  //         },
  //       });
  //       if (language) {
  //         await user.addLanguages(language);
  //       }
  //     }
  //   }
  //   if (data.specialization && data.specialization.length > 0) {
  //     for (const spec of data.specialization) {
  //       const specialization = await Specialization.findOne({
  //         where: {
  //           id: spec,
  //         },
  //       });
  //       if (specialization) {
  //         await user.addSpecializations(specialization);
  //       }
  //     }
  //   }
  //   return user;
  // }

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
