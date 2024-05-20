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
      address:{
        type: DataTypes.JSON,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },      
      role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "normal_user",
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
