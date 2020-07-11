const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const requireDir = require('require-dir');

const requiredModels = requireDir('../models');

const connection = new Sequelize(dbConfig);

// Start models and create associations
requiredModels.Country.init(connection);
requiredModels.City.init(connection);
requiredModels.Manufacturer.init(connection);
requiredModels.AircraftModel.init(connection);
requiredModels.Owner.init(connection);
requiredModels.Aircraft.init(connection);
requiredModels.User.init(connection);
requiredModels.Flight.init(connection);

requiredModels.Country.associate(connection.models);
requiredModels.City.associate(connection.models);
requiredModels.AircraftModel.associate(connection.models);
requiredModels.Aircraft.associate(connection.models);
requiredModels.User.associate(connection.models);
requiredModels.Flight.associate(connection.models);


module.exports = connection;