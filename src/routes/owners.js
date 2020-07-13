const express = require('express');
const routes = express.Router();
const OwnerController = require('../controllers/OwnerController');

routes.get('/', OwnerController.index);
routes.get('/:ownerId', OwnerController.show);
routes.post('/', OwnerController.store);
routes.put('/:ownerId', OwnerController.update);
routes.delete('/:ownerId', OwnerController.destroy);

module.exports = routes;