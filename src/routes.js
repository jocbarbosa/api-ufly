const express = require('express');
const AircraftController = require('./controllers/AircraftController');
const UserController = require('./controllers/UserController');
const CountryController = require('./controllers/CountryController');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({ message: "Hello World" })
});

routes.post('/aircrafts', AircraftController.store);

// Country routes
routes.get('/countries', CountryController.index);
routes.get('/countries/:countryId', CountryController.show);
routes.post('/countries', CountryController.store);
routes.delete('/countries/:countryId', CountryController.destroy);

// User routes
routes.get('/users', UserController.index);
routes.get('/users/:userId', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:userId', UserController.update);
routes.delete('/users/:userId', UserController.destroy);

module.exports = routes;