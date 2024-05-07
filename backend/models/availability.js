module.exports = (sequelize, DataTypes) => {
    const Availability = sequelize.define(
      "availability",
      {
        availability_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        availability_day: {
          type: DataTypes.STRING(15),
        },
        // ToDo: In the future, might need to modify the time attribute to store multiple values (accept arrays) using the set() method instead of saving each timeslot separately
        availability_time: {
          type: DataTypes.TIME,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  
    return Availability;
  };
  