module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define(
    "availability",
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      availability_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
 },
 {
  freezeTableName: true,
}

  );

  return Availability;
};
