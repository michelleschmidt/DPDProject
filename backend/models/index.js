const dbConfig = require('../config/db.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user.js')(sequelize, DataTypes)
db.Doctor = require('./doctor.js')(sequelize, DataTypes)
db.Specialization = require('./specialization.js')(sequelize, DataTypes)
// 

db.sequelize.sync({ force: false })
.then(() => {})

// 1 to Many Relation

// db.products.hasMany(db.reviews, {
//     foreignKey: 'product_id',
//     as: 'review'
// })

// Define relationships
db.Doctor.belongsToMany(db.Specialization, {
    through: "doctor_specialization",
    foreignKey: "doctor_id",
    otherKey: "specialization_id",
  });
  db.Specialization.belongsToMany(db.Doctor, {
    through: "doctor_specialization",
    foreignKey: "specialization_id",
    otherKey: "doctor_id",
  });




module.exports = db