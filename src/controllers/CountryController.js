const Country = require('../models/Country');

module.exports = {
    async index(req, res) {
        const countries = await Country.findAll();

        if (countries.length > 0) {
            return res.json({
                count: countries.length,
                method: 'GET',
                countries: countries.map(country => {
                    return {
                        id: country.id,
                        name: country.name,
                        is_active: country.is_active,
                        nationality: country.nationality,
                        flag_image_url: country.flag_image,
                        image_url: country.image
                    }
                })
            });
        }
        return res.status(404).json({
            message: 'No countries found'
        });
    },

    async show(req, res) {
        const country = await Country.findByPk(req.params.countryId);

        if (!country) {
            return res.status(404).json({
                status: 'not found',
                message: 'No country found'
            });
        }
        return res.json(country);
    },

    async store(req, res) {
        const { name, is_active, nationality } = req.body;

        const flag_image = req.files.flag_image;
        const image = req.files.image;
        const flagImageName = `${name}_flag`;
        const imageName = `${name}_image`;

        flag_image.mv(`uploads/countries/${flagImageName}.jpg`);
        flag_image.mv(`uploads/countries/${imageName}.jpg`);

        try {
            const country = await Country.create({ name, flag_image: flagImageName, image: imageName, is_active, nationality });

            return res.json({
                status: 'success',
                message: 'Country created',
                country
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err
            });
        }
    },

    async update(req, res) {
        const findCountry = await Country.findByPk(req.params.countryId);
        if (!findCountry) {
            return res.status(404).json({
                status: 'not found',
                message: 'Country not found'
            });
        }

        const { name, flag_image, image, is_active, nationality } = req.body;

        findCountry.update({
            name, flag_image, image, is_active, nationality
        })
            .then(result => {
                return res.json({
                    status: 'success',
                    message: 'Country updated'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: err
                })
            })
    },

    async destroy(req, res) {
        const findCountry = await Country.findByPk(req.params.countryId);

        if (findCountry) {
            findCountry.destroy();

            return res.json({
                status: 'success',
                message: `Country ${req.params.countryId} deleted`
            });
        }
        return res.status(404).json({
            status: 'not found',
            message: 'Country not found'
        });
    }
}