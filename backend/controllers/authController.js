const { Request, Response } = require("express");

const authService = require("../services/authService");

class authController {

  async login(req, res, next) {
    try {
      const service = new authService();
      const { user, token } = await service.login(req.body);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json({
          firstname: user.first_name,
          lastname: user.last_name,
          role: user.role,
          email: user.email,
          address: user.address,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          path: "/",
        })
        .status(200)
        .json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new authController();