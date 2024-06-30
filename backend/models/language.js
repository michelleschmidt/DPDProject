module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "language",
    {
      language_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Language;
};



