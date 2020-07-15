const express = require('express');
const AircraftModelController = require('../controllers/AircraftModelController');
const routes = express.Router();

routes.get('/', AircraftModelController.index);
routes.get('/:aircraftmodelId', AircraftModelController.show);
routes.post('/', AircraftModelController.store);
routes.put('/:aircraftmodelId', AircraftModelController.update);
routes.delete('/:aircraftmodelId', AircraftModelController.destroy);

module.exports = routes;