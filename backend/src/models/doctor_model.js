// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = require("db.js");

// const Doctor = sequelize.define(
//   "doctor",
//   {
//     title: {
//       type: DataTypes.STRING,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//     },
//     street: {
//       type: DataTypes.STRING,
//     },
//     city: {
//       type: DataTypes.STRING,
//     },
//     postcode: {
//       type: DataTypes.INTEGER,
//     },
//     state: {
//       type: DataTypes.STRING,
//     },
//     country: {
//       type: DataTypes.STRING,
//     },
//     role: {
//       type: DataTypes.STRING,
//       defaultValue: "doctor",
//     },
//     location: {
//       type: DataTypes.GEOMETRY("POINT"),
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// module.exports = Doctor;
