const { Model, DataTypes } = require('sequelize');

class AircraftModel extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            passengers: DataTypes.INTEGER,
            autonomy_km: DataTypes.INTEGER,
            description: DataTypes.STRING,
            speed_km: DataTypes.INTEGER,
            img: DataTypes.TEXT,
            manufacturer_id: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Manufacturer'
                }
            }
        }, {
            sequelize: connection,
            tableName: 'aircraft_models'
        })
    }
}

module.exports = AircraftModel;