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
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(25),
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
      role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "normal_user",
      },
      address:{
        type: DataTypes.JSON,
        allowNull: false,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      accessibility_needs: {
        type: DataTypes.STRING(),
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
