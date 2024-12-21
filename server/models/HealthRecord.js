const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HealthRecord = sequelize.define('HealthRecord', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM('Lab Result', 'Prescription', 'Diagnosis', 'Vaccination', 'Other'),
        allowNull: false
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    provider: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'health_records',
    timestamps: true
});

module.exports = HealthRecord; 