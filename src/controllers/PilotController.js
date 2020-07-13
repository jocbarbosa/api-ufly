const Pilot = require('../models/Pilot');
const { destroy } = require('../models/Pilot');

module.exports = {
    async index(req, res) {
        const pilots = await Pilot.findAll();

        if (pilots.length > 0) {
            return res.json({
                count: pilots.length,
                pilots
            });
        }

        return res.status(404).json({ status: 'not found', message: 'Pilots not found' });
    },

    async show(req, res) {
        const pilot = await Pilot.findByPk(req.params.pilotId);
        if (pilot) {
            return res.json(pilot);
        }
        return res.status(404).json({ status: 'not found', message: 'Pilot not found' });
    },

    async store(req, res) {
        const { name, birthday, registration, owner_id } = req.body;

        try {
            const pilot = Pilot.create({ name, birthday, registration })
                .then(result => {
                    return res.status(201).json({
                        status: 'success',
                        message: 'Pilot created',
                        pilot: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        status: 'error',
                        message: err.message
                    });
                });

        } catch (err) {
            return res.status(500).json({ status: 'error', message: err });
        }
    },

    async update(req, res) {
        const pilot = await Pilot.findByPk(req.params.pilotId);

        if (pilot) {
            const { name, registration, birthday, owner_id } = req.body;
            pilot.update({ name, registration, birthday, owner_id });

            res.json({ status: 'success', message: 'Pilot updated' });
        }

        return res.status(404).json({ status: 'not found', message: 'Pilot not found' });
    },

    async destroy(req, res) {
        const pilot = await Pilot.findByPk(req.params.pilotId);

        if (pilot) {
            pilot.destroy();

            return res.json({ status: 'success', message: 'Pilot deleted' });
        }

        return res.status(404).json({ status: 'not found', message: 'Pilot not found' });
    }
}