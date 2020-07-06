const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const requireDir = require('require-dir');

const requiredModels = requireDir('../models');

const connection = new Sequelize(dbConfig);

// Start models and create associations
requiredModels.Country.init(connection);
requiredModels.City.init(connection);
requiredModels.City.associate(connection.models);
requiredModels.Manufacturer.init(connection);
requiredModels.AircraftModel.init(connection);
requiredModels.AircraftModel.associate(connection.models);
requiredModels.Owner.init(connection);
requiredModels.Aircraft.init(connection);
requiredModels.Aircraft.associate(connection.models);
requiredModels.User.init(connection);
requiredModels.User.associate(connection.models);
requiredModels.Flight.init(connection);
requiredModels.Flight.associate(connection.models);


module.exports = connection;