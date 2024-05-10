const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

const userController = require("../controllers/userController");
const doctorController = require("../controllers/doctorController");

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.post('/doctor-register', doctorController.create);
authRouter.post('/doctor-login', authController.doctorLogin);



module.exports = authRouter;
