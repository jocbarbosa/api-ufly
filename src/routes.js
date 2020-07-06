const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({ message: "Hello Ufly" })
});

module.exports = routes;