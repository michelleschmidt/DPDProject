const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");


authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.get('/check-auth', authController.checkAuth);

authRouter.post('/logout', authController.logout);



module.exports = authRouter;
