const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospital = sequelize.define('Hospital', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lon: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    contact: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    services: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    operatingHours: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'hospitals',
    timestamps: true
});

module.exports = Hospital; 