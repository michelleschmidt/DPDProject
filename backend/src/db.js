const Sequelize = require("sequelize");
// require('dotenv').config();

const sequelize = new Sequelize("health_hub", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;
