const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Install requireDir to import all models

// Instanciating Models
const Country = require('../models/Country');
const City = require('../models/City');
const Manufacturer = require('../models/Manufacturer');
const Aircraft = require('../models/Aircraft');
const AircraftModel = require('../models/AircraftModel');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Country.init(connection);
City.init(connection);
City.associate(connection.models);
Manufacturer.init(connection);
AircraftModel.init(connection);
Aircraft.init(connection);
User.init(connection);

module.exports = connection;