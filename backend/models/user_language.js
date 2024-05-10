// module.exports = (sequelize, DataTypes) => {
//     const UserLanguage = sequelize.define('user_language', {
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             references: {
//                 model: 'user',
//                 key: 'user_id'
//             }
//         },
//         language_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             references: {
//                 model: 'language',
//                 key: 'language_id'
//             }
//         }
//     },
//     {
//         freezeTableName: true,
//         timestamps: true,
//       }
// );
//     return UserLanguage;
//   };