const Manufacturer = require('../models/Manufacturer');

module.exports = {
    async index(req, res) {
        const manufacturers = await Manufacturer.findAll();

        if (manufacturers.length > 0) {
            res.json({
                count: manufacturers.length,
                manufacturers
            })
        } else {
            return res.status(404).json({
                status: 'not found',
                message: 'No manufacturers found'
            })
        }
    },

    async show(req, res) {
        const manufacturer = await Manufacturer.findByPk(req.params.manufacturerId);

        if (manufacturer) {
            return res.json(manufacturer);
        }

        return res.status(404).json({
            status: 'not found',
            message: 'Manufacturer not found for this Id'
        });
    },

    async store(req, res) {
        const { name, description } = req.body;

        try {
            const manufacturer = await Manufacturer.create({ name, description });

            return res.json({
                status: 'success',
                message: 'Manufacturer created',
                manufacturer
            })
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err
            })
        };
    },

    async update(req, res) {
        const manufacturer = await Manufacturer.findByPk(req.params.manufacturerId);

        if (!manufacturer) {
            return res.status(404).json({ status: 'not found', message: 'Manufacturer not found' });
        }

        try {
            const { name, description } = req.body;

            manufacturer.update({
                name, description
            });

            return res.json({
                status: 'success',
                message: 'Manufacturer updated'
            });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err });
        };
    },

    async destroy(req, res) {
        const manufacturer = await Manufacturer.findByPk(req.params.manufacturerId);

        if (!manufacturer) {
            return res.status(404).json({ status: 'not found', message: 'Manufacturer not found for this Id' });
        }

        try {
            const manufacturerId = manufacturer.id;
            manufacturer.destroy();

            return res.json({ status: 'success', message: `Manufacturer ID ${manufacturerId} deleted` });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: err });
        }
    }
}