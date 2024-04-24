const Sequelize = require("sequelize");
require('dotenv').config();


const sequelize = new Sequelize(
 'health_hub',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});