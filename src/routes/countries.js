const express = require('express');
const routes = express.Router();

const CountryController = require('../controllers/CountryController');

routes.get('/', CountryController.index);
routes.get('/:countryId', CountryController.show);
routes.post('/', CountryController.store);
routes.delete('/:countryId', CountryController.destroy);
routes.put('/:countryId', CountryController.update);


module.exports = routes;