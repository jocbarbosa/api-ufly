const User = require('../models/User');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        if (users.length > 0) {
            return res.status(201).json({
                count: users.length,
                users
            });
        }
        return res.status(404).json({
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

    async login(req, res) {
        const { email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (!userExists) {
            return res.status(500).json({ status: 'error', message: 'Login failed, check your credentials' });
        };

        bcrypt.compare(password, userExists.password, (error, response) => {
            if (response) {

                const token = jwt.sign({
                    email: userExists.email,
                    userId: userExists.id
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                );

                return res.json({ status: 'authorized', message: 'Auth successful', token });
            }

            return res.status(401).json({ status: 'unauthorized', message: error });
        })

    },

    async signup(req, res) {

        const userExists = await User.findAll({ where: { email: req.body.email } });

        if (userExists.length > 0) {
            return res.json({ status: 'error', message: 'Email already registered' });
        }

        const { name, email, password, birthday, country_id } = req.body;
        const hash = bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ err });
            }

            try {
                const user = await User.create({
                    name, email, password: hash, birthday, country_id
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
        });
    },

    async update(req, res) {
        const { name, email, password, birthday, is_active, country_id, passport, passport_emitter, passport_shelf_life } = req.body;

        const user = await User.update({ name, email, password, birthday, is_active, country_id, passport, passport_emitter, passport_shelf_life }, {
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