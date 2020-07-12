const express = require('express');
const routes = express.Router();

const PilotController = require('../controllers/PilotController');

routes.get('/', PilotController.index);
routes.get('/:pilotId', PilotController.show);
routes.post('/', PilotController.store);
routes.put('/:pilotId', PilotController.update);
routes.delete('/:pilotId', PilotController.destroy);

module.exports = routes;