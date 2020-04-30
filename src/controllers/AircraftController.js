const Aircraft = require('../models/Aircraft');

module.exports = {
    async index(request, response) {

    },

    async store(request, response) {
        const { name } = request.body;

        const aircraft = await Aircraft.create({
            name
        });

        return response.json(aircraft);
    }
}