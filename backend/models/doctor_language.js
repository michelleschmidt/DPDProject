module.exports = (sequelize, DataTypes) => {
  const DoctorLanguage = sequelize.define(
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
      language_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "language",
          key: "language_id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );


  return DoctorLanguage;
};
