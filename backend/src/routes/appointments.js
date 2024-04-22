// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Book an appointment
router.post('/book', (req, res) => {
    const { date, userId, doctorId } = req.body;
    Appointment.create({ date, userId, doctorId })
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
