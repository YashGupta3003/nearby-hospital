const sequelize = require('../config/database');
const User = require('./User');
const Hospital = require('./Hospital');
const Appointment = require('./Appointment');
const HealthRecord = require('./HealthRecord');

// Define relationships
User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Hospital.hasMany(Appointment, { foreignKey: 'hospitalId' });
Appointment.belongsTo(Hospital, { foreignKey: 'hospitalId' });

User.hasMany(HealthRecord, { foreignKey: 'userId' });
HealthRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Hospital,
    Appointment,
    HealthRecord
}; 