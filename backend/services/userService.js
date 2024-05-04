const db = require("../models");
bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { getCoordinates } = require("../utils");
const User = db.User;

class UserService {


  async createUser(userData) {
    let user = await User.findOne({ where: { email: userData.email }});
 
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
 
    return user;
  }

  async getUserById(userId) {
    return await User.findByPk(userId);
  }


  async updateUser(userId, updates) {
    const user = await User.findByPk(userId);
    if (user) {
      return await user.update(updates);
    }
    return null;
  }


  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (user) {
      return await user.destroy();
    }
    return null;
  }

  async listUsers() {
    return await User.findAll();
  }
}

module.exports = new UserService();
