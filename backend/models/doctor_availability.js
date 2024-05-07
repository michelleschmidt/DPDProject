module.exports = (sequelize, DataTypes) => {
    const DoctorAvailability = sequelize.define(
      "doctor_language",
      {
        doctor_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "doctor",
            key: "id",
          },
        },
        availability_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "availability",
            key: "availability_id",
          },
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
  
    return DoctorAvailability;
  };
  