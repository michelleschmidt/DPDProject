module.exports = (sequelize, DataTypes) => {
    const Specialization = sequelize.define(
      "specialization",
      {
        area_of_specialization: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Specialization;
  };
  