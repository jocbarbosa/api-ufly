const { Model, DataTypes } = require('sequelize');

class AircraftModel extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            passengers_capacity: DataTypes.INTEGER,
            autonomy: DataTypes.FLOAT,
            description: DataTypes.STRING,
            speed: DataTypes.FLOAT,
            manufacturer_id: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'manufacturers'
                }
            }
        }, {
            sequelize: connection,
            tableName: 'aircraft_models'
        })
    }
}

module.exports = AircraftModel;