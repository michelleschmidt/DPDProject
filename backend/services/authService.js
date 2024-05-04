const db = require("../models");
bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = db.User;
const Doctor = db.Doctor;




class authService {

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
      process.env.ACCESS_KEY,
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
        doctorId: doctor.dataValues.id,
        role: doctor.dataValues.role,
      },
      process.env.ACCESS_KEY,
      { expiresIn: "24h" }
    );
    return {
        doctor,
      token,
    };
  }


}



module.exports = authService;