const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Install requireDir to import all models

// Instanciating Models
const Aircraft = require('../models/Aircraft');
const AircraftModel = require('../models/AircraftModel');
const Manufacturer = require('../models/Manufacturer');

const connection = new Sequelize(dbConfig);

Aircraft.init(connection);
AircraftModel.init(connection);
Manufacturer.init(connection);

module.exports = connection;