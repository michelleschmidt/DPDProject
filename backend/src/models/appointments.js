// models/appointment.js
const Sequelize = require('sequelize');
const sequelize = require('./index');

const Appointment = sequelize.define('appointment', {
    date: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    doctorId: Sequelize.INTEGER
});

module.exports = Appointment;
