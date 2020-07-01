const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        if (users.length > 0) {
            return res.json({
                count: users.length,
                users
            });
        }
        return res.status(404).json({
            count: 0,
            message: 'No users found'
        });
    },
    async show(req, res) {
        const user = await User.findByPk(req.params.userId);

        if (user) {
            return res.json(user);
        }

        res.status(404).json({
            message: 'No user found'
        });

    },
    async store(req, res) {
        const { name, email, password, birthday } = req.body;
        try {
            const user = await User.create({
                name, email, password, birthday
            });

            return res.status(201).json({
                message: 'User created',
                request: 'POST',
                user
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error during user creation',
                request: 'POST',
                error: err
            })
        }
    },
    async update(req, res) {
        const { name, email, password, birthday, active } = req.body;
        const user = await User.update({ name, email, password, birthday, active }, {
            where: {
                id: req.params.userId
            }
        });

        if (user) {
            return res.json({
                message: 'User updated',
                status: 'success'
            });
        }
        res.status(500).json({
            message: 'User update failed',
            status: 'error'
        })
    },
    async destroy(req, res) {
        const userExists = await User.findByPk(req.params.userId);

        if (userExists) {
            const user = User.destroy({
                where: {
                    id: req.params.userId
                }
            });

            return res.json({
                message: 'User deleted'
            });
        }

        res.status(404).json({
            message: 'User not found'
        });
    }
}