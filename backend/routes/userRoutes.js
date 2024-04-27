const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const roleCheck = require("../middleware/roleCheck");

router.get('/', userController.listUsers);

router.post('/', roleCheck('admin'), userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', roleCheck('admin'), userController.updateUser);
router.delete('/:id', roleCheck('admin'), userController.deleteUser);

module.exports = router;
