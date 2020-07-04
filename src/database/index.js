const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Install requireDir to import all models

// Instanciating Models
const Country = require('../models/Country');
const City = require('../models/City');
const Manufacturer = require('../models/Manufacturer');
const AircraftModel = require('../models/AircraftModel');
const Owner = require('../models/Owner');
const Aircraft = require('../models/Aircraft');
const User = require('../models/User');
const Flight = require('../models/Flight');

const connection = new Sequelize(dbConfig);


// Start models and create associations
Country.init(connection);
City.init(connection);
City.associate(connection.models);
Manufacturer.init(connection);
AircraftModel.init(connection);
AircraftModel.associate(connection.models);
Owner.init(connection);
Aircraft.init(connection);
Aircraft.associate(connection.models);
User.init(connection);
User.associate(connection.models);
Flight.init(connection);
Flight.associate(connection.models);


module.exports = connection;