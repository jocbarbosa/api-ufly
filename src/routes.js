const express = require('express');
const AircraftController = require('./controllers/AircraftController');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({ message: "Hello World" })
});

routes.post('/aircrafts', AircraftController.store);

module.exports = routes;