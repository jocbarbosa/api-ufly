const express = require('express');
const AircraftController = require('./controllers/AircraftController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({ message: "Hello World" })
});

routes.post('/aircrafts', AircraftController.store);

// User routes
routes.get('/users', UserController.index);
routes.get('/users/:userId', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:userId', UserController.update);
routes.delete('/users/:userId', UserController.destroy);

module.exports = routes;