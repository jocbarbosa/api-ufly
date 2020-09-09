const City = require('../models/City');
const Country = require('../models/Country');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const cities = await City.findAll();

        if (cities.length > 0) {
            return res.json({
                count: cities.length,
                cities
            });
        }
        return res.status(404).json({ status: 'not found', message: 'No cities found' });
    },

    async show(req, res) {
        const city = await City.findByPk(req.cityId);

        if (city) {
            return res.json(city);
        }

        return res.json({ status: 'error', message: 'City not found' });

    },

    async citiesByCountry(req, res) {
        const { country_id } = req.body;
        const country = await Country.findByPk(country_id, {
            include: { association: 'cities_by_country' }
        });
    },

    async store(req, res) {
        const { name, is_active, country_id } = req.body;
        const cityImage = req.files.image;
        cityImage.mv(`uploads/cities/${name}.jpg`);

        try {
            const city = await City.create({
                name, is_active, country_id, image: cityImage.name
            });

            return res.status(201).json({
                status: 'success',
                message: 'City created',
                city
            });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err })
        }
    },

    async update(req, res) {
        const city = await City.findByPk(req.params.cityId);

        if (!city) {
            return res.status(404).json({ status: 'not found', message: 'No city found for this Id' });
        }

        const { name, country_id } = req.body;

        fs.unlink(`uploads/cities/${city.image}`, (err) => {
            if (err) {
                return res.json({ message: err })
            }
        });
        const cityImage = `${name}.jpg`;
        req.files.image.mv(`uploads/cities/${cityImage}`);

        try {
            city.update({ name, country_id, image: cityImage });
            return res.json({ status: 'success', message: 'City updated' });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err });
        }
    },

    async destroy(req, res) {
        const city = await City.findByPk(req.params.cityId);
        if (city) {
            try {
                city.destroy();
                fs.unlink(`uploads/cities/${city.image}`, (err) => {
                    if (err) {
                        return res.json({ message: err })
                    }
                });
                return res.json({
                    message: 'City deleted'
                });
            } catch (err) {
                return res.status(500).json({ status: 'error', message: err })
            }
        }
        return res.status(404).json({ status: 'not found', message: 'No city found for this Id' });
    }
}