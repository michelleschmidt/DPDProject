
const express = require('express');
const doctorRouter = express.Router();
const doctorController = require('../controllers/doctorController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");


doctorRouter.post('/', isLoggedIn, roleCheck('admin'), doctorController.create);

doctorRouter.get('/', doctorController.findAll);
doctorRouter.get('/:id', isLoggedIn, doctorController.findOne);

doctorRouter.put('/:id', isLoggedIn, roleCheck('admin'), doctorController.update);
doctorRouter.delete('/:id', isLoggedIn, roleCheck('admin'), doctorController.delete);


//doctorRouter.get("/search", doctorController.search);


module.exports = doctorRouter;
