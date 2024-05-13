module.exports = (sequelize, DataTypes) => {
    const DoctorSpecialization = sequelize.define('doctor_specialization', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        specialization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'specialization',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
      }
    );
    return DoctorSpecialization;
  };