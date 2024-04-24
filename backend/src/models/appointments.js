// models/appointment.js
const Sequelize = require('sequelize');
const sequelize = require('db.js');

const Appointment = sequelize.define('appointment', {
    date: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    doctorId: Sequelize.INTEGER
});

module.exports = Appointment;
