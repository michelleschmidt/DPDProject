const db = require("../models");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCoordinates } = require("../utils");

const User = db.User;
class UserService {

  async createUser(data) {
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

    return user;
  }

  async getUsers() {
    const user = await User.findAll();
    return user;
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);
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
