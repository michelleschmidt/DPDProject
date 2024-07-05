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
          secure: true,
          sameSite: "none",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(201)
        .json({
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          email: user.email,
          address: user.address,
          languages: user.languages,
        });
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req, res, next) {
    try {
      const token = req.cookies.token;
      const user = await AuthService.checkAuth(token);
      res.json({ user });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
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
