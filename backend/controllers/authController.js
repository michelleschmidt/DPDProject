const { Request, Response } = require("express");

const AuthService = require("../services/authService");

class AuthController {

  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { user, token } = await AuthService.login(req.body);
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


  async doctorLogin(req, res, next) {
    try {
      // const service = new authService();
      const { doctor, token } = await AuthService.doctorLogin(req.body);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json({
          firstname: doctor.first_name,
          lastname: doctor.last_name,
          role: doctor.role,
          email: doctor.email,
          address: doctor.address,
          language: doctor.language,
          specialization: doctor.specialization,
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

module.exports = new AuthController();