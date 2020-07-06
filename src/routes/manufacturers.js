const express = require('express');
const routes = express.Router();

const ManufacturerController = require('../controllers/ManufacturerController');


routes.get('/', ManufacturerController.index);
routes.get('/:manufacturerId', ManufacturerController.show);
routes.post('/', ManufacturerController.store);
routes.delete('/:manufacturerId', ManufacturerController.destroy);
routes.put('/:manufacturerId', ManufacturerController.update);


module.exports = routes;