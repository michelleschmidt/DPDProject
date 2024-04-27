module.exports = (sequelize, DataTypes) => {
    const DoctorSpecialization = sequelize.define('doctor_specialization', {
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'doctor',
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
    });
    
  
    return DoctorSpecialization;
  };