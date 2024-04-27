const db = require("../models");

const User = db.User;

class UserService {
  async createUser(userData) {
    return await User.create(userData);
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
