const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');



router.post('/users', user_controller.createUser);

module.exports = router;
