const { Model, DataTypes } = require('sequelize');

class Manufacturer extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'manufacturers'
        })
    }
}

module.exports = Manufacturer;