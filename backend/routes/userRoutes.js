const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");

userRouter.get('/', isLoggedIn, userController.listUsers);
userRouter.post('/create-new', isLoggedIn, roleCheck('admin'), userController.createUser);

userRouter.get('/:id', isLoggedIn, userController.getUser);

userRouter.put('/:id', isLoggedIn, roleCheck('admin'), userController.updateUser);
userRouter.delete('/:id', isLoggedIn, roleCheck('admin'), userController.deleteUser);

module.exports = userRouter;
