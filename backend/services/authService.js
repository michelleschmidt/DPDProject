const db = require("../models");
bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = db.User;




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
}

module.exports = authService;