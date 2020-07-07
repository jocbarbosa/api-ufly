const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/UserController');

routes.get('/', UserController.index);
routes.get('/:userId', UserController.show);
routes.post('/', UserController.signup);
routes.post('/', UserController.login);
routes.put('/:userId', UserController.update);
routes.delete('/:userId', UserController.destroy);

module.exports = routes;