module.exports = (sequelize, DataTypes) => {
    const UserLanguage = sequelize.define('user_language', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'language',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
      }
);
    return UserLanguage;
  };