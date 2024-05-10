module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "appointment",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user", 
          key: "id", 
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user", 
          key: "id", 
        },
      },
      availability_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "availability",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Appointment;
};
