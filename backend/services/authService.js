const db = require("../models");
const axios = require("axios");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.User;
const Specialization = db.Specialization;
const Language = db.Language;

class AuthService {

  async register(data) {
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("email already exists");
    }
    data.email = data.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Extract address details from the request
    const { postcode, street, city, state, country } = data.address;

    // Create the address string
    const addressString = `${postcode}, ${street}, ${city}, ${state}, ${country}`;

    // Fetch geolocation data
    const params = {
      access_key: process.env.API_ACCESS_KEY,
      query: addressString,
    };

    const geocodingResponse = await axios.get(
      "http://api.positionstack.com/v1/forward",
      { params }
    );

    const lat = geocodingResponse.data.data[0].latitude;
    const lng = geocodingResponse.data.data[0].longitude;

    const coordinates = {
      type: "Point",
      coordinates: [lng, lat], // Note: longitude comes before latitude
    };
    // Add the coordinates to the request data
    data.location = coordinates;
    return await db.sequelize.transaction(async (t) => {
      user = await User.create(data, { transaction: t });

      if (data.languages && data.languages.length > 0) {
        // Assuming data.language is an array of language IDs
        await user.setLanguages(data.languages, { transaction: t });
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
      include: [
        {
          model: Language,
          through: { attributes: [] }, // This excludes the junction table attributes
        },
      ],
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
        address: user.address,
      },
      process.env.SECRETE,
      { expiresIn: "24h" }
    );
    return {
      user,
      token,
    };
  }

  async checkAuth(token) {
    if (!token) throw new Error("No token found");

    const decoded = jwt.verify(token, process.env.SECRETE);
    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "first_name", "last_name", "role", "email", "address"],
      include: [
        {
          model: Language,
          through: { attributes: [] },
        },
      ],
    });
    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = new AuthService();
