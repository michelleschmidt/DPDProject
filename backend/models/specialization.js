module.exports = (sequelize, DataTypes) => {
  const Specialization = sequelize.define(
    "specialization",
    {
      area_of_specialization: {
          type: DataTypes.STRING(55),
          allowNull: false,
        },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Specialization;
};
