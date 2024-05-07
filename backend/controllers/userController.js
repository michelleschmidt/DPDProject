const UserService = require("../services/userService");

class UserController {

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.body.user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } 

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.body.user_id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "Update not successful" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await UserService.deleteUser(req.body.user_id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await UserService.listUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
