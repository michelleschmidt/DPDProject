
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { roleCheck } = require("../middleware/roleCheck");


router.post('/', isLoggedIn, roleCheck('admin'), doctorController.create);
router.get('/', isLoggedIn, doctorController.findAll);
router.get("/search", doctorController.search);
router.get('/:id', isLoggedIn, doctorController.findOne);
router.put('/:id', isLoggedIn, roleCheck('admin'), doctorController.update);
router.delete('/:id', isLoggedIn, roleCheck('admin'), doctorController.delete);


// router.get('/api/doctors', controller.findDoctorByLanguageAndSpecialization);


module.exports = router;
