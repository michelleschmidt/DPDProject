const { getCoordinates } = require("../utils");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      title: {
        type: DataTypes.STRING(15),
      },
      first_name: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(25),
      },
      gender: {
        type: DataTypes.STRING(15),
      },      
      insurance_type: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "public",
      },
      address:{
        type: DataTypes.JSON,
        allowNull: false,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },      
      role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "normal_user",
      },
      accessibility_needs: {
        type: DataTypes.STRING(),
        defaultValue: "none",
      },
      emergency_contact_details: {
        type: DataTypes.JSON,
      },
      specialization_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'specialization',
            key: 'id'
        }
      },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};
