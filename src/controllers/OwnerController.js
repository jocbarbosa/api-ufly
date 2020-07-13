const Owner = require('../models/Owner');
const fs = require('fs');
const path = require('path');

module.exports = {
    async index(req, res) {
        const owners = await Owner.findAll();

        if (owners.length > 0) {
            return res.json({
                count: owners.length,
                owners
            });
        }
        return res.status(404).json({ status: 'not found', message: 'Owners not found' });
    },

    async show(req, res) {
        const owner = await Owner.findByPk(req.params.ownerId);

        if (owner) {
            return res.json(owner);
        }

        return res.status(404).json({ status: 'not found', message: 'Owner not found' });
    },

    async store(req, res) {
        const { name, email, password, type } = req.body;

        const image = req.files.image;
        const imageName = `${name}-onwer.jpg`;

        const pathImage = path.join(__dirname, '..', '..', 'uploads', 'owners');

        try {
            image.mv(`${pathImage}/${imageName}`);

            const owner = await Owner.create({ name, email, password, type, image: imageName })
                .then(result => {
                    res.json({
                        status: 'success',
                        message: 'Owner created',
                        owner: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({ status: 'error', message: err.message });
                })
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err.message })
        }
    },

    async update(req, res) {
        const owner = await Owner.findByPk(req.params.ownerId);

        if (owner) {
            const pathImage = path.join(__dirname, '..', '..', 'uploads', 'owners', owner.image);
            fs.unlink(pathImage, (err) => {
                if (err) {
                    return res.json({ status: 'error', message: err });
                }
            });
            const imageName = `${name}-owner.jpg`;
            const pathSaveImage = path.join(__dirname, '..', '..', 'uploads', 'owners', imageName);
            req.files.image.mv(pathSaveImage);

            const { name, email, password, type } = req.body;

            owner.update({ name, email, password, type, image: imageName })
                .then(result => {
                    return res.json({ status: 'success', message: 'Owner updated' });
                })
                .catch(err => {
                    return res.status(500).json({ status: 'error', message: err });
                });
        }

        return res.status(404).json({ status: 'not found', message: 'Owner not found' });
    },

    async destroy(req, res) {
        const owner = await Owner.findByPk(req.params.ownerId);

        if (owner) {
            const imageName = `${owner.name}-onwer.jpg`;
            const pathImage = path.join(__dirname, '..', '..', 'uploads', 'owners', imageName);

            fs.unlink(pathImage, (error) => {
                if (error) {
                    return res.json({ status: 'error', message: 'Error on deleting image' });
                }
            });

            try {
                owner.destroy();
                return res.json({ status: 'success', message: 'Owner deleted' });
            } catch (err) {
                return res.status(500).json({ status: 'error', message: err });
            }
        }
        return res.status(500).json({ status: 'error', message: 'Owner not found' });
    }

}