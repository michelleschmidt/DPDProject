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
      street: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      address: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.street}, ${this.postcode}, ${this.city}, ${this.state}, ${this.country}`;
        },
        set(value) {
          throw new Error("Do not try to set the address directly!");
        },
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },      
      role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "normal_user",
      },
      // language: {
      //   type: DataTypes.JSON,
      //   allowNull: false,
      // },
      // specialization: {
      //   type: DataTypes.JSON,
      // }
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
