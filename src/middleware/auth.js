const jsonWebToken = require('jsonwebtoken');
const { response } = require('express');

const jwt = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
    } catch (err) {
        return response.status(500).json({ message: 'Not authorized' });
    }
}

module.exports = jwt;