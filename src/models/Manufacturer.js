const { Model, DataTypes } = require('sequelize');

class Manufacturer extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'aircrafts_manufacturers'
        })
    }
}

module.exports = Manufacturer;