const Specialization = require("./specialization");

module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "doctor",
    {
      title: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // ToDO:change later
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "doctor",
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
    },
    {
      freezeTableName: true,
    }
  );

  Doctor.belongsToMany(Specialization, {
    through: "doctor_specialization",
    foreignKey: "doctor_id",
    otherKey: "specialization_id",
  });

  Specialization.belongsToMany(Doctor, {
    through: "doctor_specialization",
    foreignKey: "specialization_id",
    otherKey: "doctor_id",
  });

  return Doctor;
};
