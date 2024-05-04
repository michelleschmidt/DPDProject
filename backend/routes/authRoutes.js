const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

const userController = require("../controllers/userController");


authRouter.post('/register', userController.createUser);


authRouter.post('/login', authController.login);

module.exports = authRouter;
