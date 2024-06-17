const fs = require('fs');
const path = require('path');

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD ||''
    // This part 'process.env.DB_PASSWORD || ' from the line above should be 
        // commented or removed when running the app on local machine(no docker)
        ,
    DB: process.env.DB_NAME || 'health_hub',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.resolve(__dirname, './DigiCertGlobalRootCA.crt.pem'))
        },
    },

    pool: {
        max: 8,
        min: 0,
        acquire: 50000,
        idle: 10000
    },
}