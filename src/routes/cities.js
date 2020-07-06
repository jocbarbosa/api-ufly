const express = require('express');
const routes = express.Router();

const CityController = require('../controllers/CityController');

routes.get('/', CityController.index);
routes.post('/', CityController.store);
routes.put('/:cityId', CityController.update);
routes.delete('/:cityId', CityController.destroy);

module.exports = routes;