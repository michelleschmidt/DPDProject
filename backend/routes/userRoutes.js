const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

const roleCheck = require("../middleware/roleCheck");

userRouter.get('/', userController.listUsers);



userRouter.post('/create-new', roleCheck('admin'), userController.createUser);

userRouter.get('/:id', userController.getUser);

userRouter.put('/:id', roleCheck('admin'), userController.updateUser);
userRouter.delete('/:id', roleCheck('admin'), userController.deleteUser);

module.exports = userRouter;
