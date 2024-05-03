module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(25),
      },
      first_name: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // ToDO:change later
      },

      street: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "normal_user",
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return User;
};
