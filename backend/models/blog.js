module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "blog",
    {
      blog_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      blog_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Blog;
};
