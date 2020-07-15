const AircraftModel = require('../models/AircraftModel');

module.exports = {
    async index(req, res) {
        const models = await AircraftModel.findAll();

        if (models.length > 0) {
            return res.json({
                count: models.length,
                models: models
            })
        };

        return res.status(404).json({ status: 'not found', message: 'Aircraft models not found' });
    },

    async show(req, res) {
        const model = await AircraftModel.findByPk(req.params.aircraftmodelId);

        if (model) {
            return res.json(model);
        }

        return res.status(404).json({ status: 'error', message: 'Aircraft model not found' });
    },

    async store(req, res) {

    },

    async update(req, res) {

    },

    async destroy(req, res) {

    }
}