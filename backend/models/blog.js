module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "blog",
    {
      blog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "user_id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Blog;
};
