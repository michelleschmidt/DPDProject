const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");



userRouter.get('/', isLoggedIn, userController.getDoctors);

userRouter.post('/admin-create', isLoggedIn, roleCheck('admin'), userController.createUser);

userRouter.get('/patients', isLoggedIn, roleCheck('admin'), userController.getPatients);

userRouter.get('/all-users', isLoggedIn, roleCheck('admin'), userController.getUsers);

userRouter.get('/doctor/:id', isLoggedIn, userController.getDoctorById);

userRouter.get('/:id', isLoggedIn, userController.getUserById);

userRouter.put('/:id', isLoggedIn, userController.updateUser);

userRouter.delete('/:id', isLoggedIn, roleCheck('admin'), userController.deleteUser);

module.exports = userRouter;
