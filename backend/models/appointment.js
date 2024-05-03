module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "appointment",
    {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "user_id",
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "doctor",
          key: "id",
        },
      },
      appointment_date: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Appointment;
};
