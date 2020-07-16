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
        const { name, passengers_capacity, autonomy, description, speed, manufacturer_id } = req.body;

        try {
            const model = await AircraftModel.create({ name, passengers_capacity, autonomy, description, speed, manufacturer_id });

            return res.status(201).json({
                status: 'success',
                message: 'Aircraft model created',
                model
            });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err });
        }
    },

    async update(req, res) {
        const model = await AircraftModel.findByPk(req.params.id);

        if (model) {
            const { name, passengers_capacity, autonomy, description, speed, manufacturer_id } = req.body;

            try {
                model.update({ name, passengers_capacity, autonomy, description, speed, manufacturer_id });

                return res.json({ status: 'success', message: 'Aircraft model updated' });

            } catch (err) {
                return res.status(500).json({ status: 'error', message: err.message });
            }
        }

        return res.status(404).json({ status: 'not found', message: 'Aircraft model not found' });
    },

    async destroy(req, res) {
        const model = await AircraftModel.findByPk(req.params.id);

        if (model) {
            try {
                model.destroy();

                return res.json({ status: 'success', message: 'Aircraft Model deleted' });
            } catch (err) {
                return res.status(500).json({ status: 'not found', message: err.message });
            }
        }

        return res.status(404).json({ status: 'not found', message: 'Aircraft Model not found' });
    }
}