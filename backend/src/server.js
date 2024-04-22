// server.js
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: 'APP_ID',
    key: 'APP_KEY',
    secret: 'SECRET',
    cluster: 'CLUSTER',
    useTLS: true
});

app.post('/update-appointment', (req, res) => {
    const { appointmentId, newDate } = req.body;
    // Update appointment logic here
    pusher.trigger('appointment-channel', 'updated', {
        message: 'Appointment updated!'
    });
    res.send('Appointment updated');
});
