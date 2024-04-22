// routes/dashboard.js
router.get('/user/:userId', (req, res) => {
    Appointment.findAll({ where: { userId: req.params.userId } })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/doctor/:doctorId', (req, res) => {
    Appointment.findAll({ where: { doctorId: req.params.doctorId } })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});
