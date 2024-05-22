const UserService = require("../services/userService");

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorById(req, res, next) {
    try {
      const user = await UserService.getDoctorById(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }


  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getDoctors(req, res, next) {
    try {
      const users = await UserService.getDoctors();
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
