const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("db.js");

const User = sequelize.define('User', {

  title: {
    type: DataTypes.STRING
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  street: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  postcode: {
    type: DataTypes.INTEGER
  },
  state: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = User;
