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
        references: {
          model: "user",
          key: "user_id",
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "doctor",
          key: "id",
        },
      },
      appointment_date: {
        type: DataTypes.DATE,
      },
      appointment_time: {
        type: DataTypes.TIME,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Appointment;
};
