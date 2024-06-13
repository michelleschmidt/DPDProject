const fs = require('fs');
const path = require('path');

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || ''
        // This part '|| process.env.DB_PASSWORD' from the line above should be 
        // commented or removed when running the app on local machine(no docker)
        ,
    DB: process.env.DB_NAME || 'health_hub',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.resolve(__dirname, './DigiCertGlobalRootG2.crt.pem')),
            rejectUnauthorized: false // Allow self-signed certificates
        },
    },

    pool: {
        max: 8,
        min: 0,
        acquire: 50000,
        idle: 10000
    },
    define: {
        // Prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}