const db = require("../models");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCoordinates } = require("../utils");

const User = db.User;
const Language = db.Language;
class UserService {
  async createUser(userData) {
    try {
      let user = await User.findOne({ where: { email: userData.email } });

      if (user) {
        throw new Error("email already exists");
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // ToDo: set up the location coordinates
      // const { postcode, street, city, state, country } = userData;
      //  const coordinates = await getCoordinates(postcode, street, city, state, country);
      // userData.location = sequelize.literal(`ST_GeomFromText('POINT(${coordinates.lng} ${coordinates.lat})')`);
      //  console.log("we got here again")

      user = await User.create({ ...userData, password: hashedPassword });

      // Language is either a single value or an array of values
      if (userData.language && userData.language.length > 0) {
        for (const lang of userData.language) {
          const language = await Language.findOne({
            where: {
              language_id: lang,
            },
          });
          if (language) {
            await user.addLanguage(language);
          }
        }
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    return await User.findByPk(userId);
  }

  async updateUser(userId, updates) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        return await user.update(updates);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (user) {
        return await user.destroy();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async listUsers() {
    return await User.findAll();
  }
}

module.exports = new UserService();
