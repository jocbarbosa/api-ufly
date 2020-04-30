const { Model, DataTypes } = require('sequelize');

class Aircraft extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'aircrafts'
        })
    }
}

module.exports = Aircraft;