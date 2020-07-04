const { Model, DataTypes } = require('sequelize');

class AircraftModel extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            passengers_capacity: DataTypes.INTEGER,
            autonomy: DataTypes.FLOAT,
            description: DataTypes.STRING,
            speed: DataTypes.FLOAT
        }, {
            sequelize: connection,
            tableName: 'aircraft_models'
        });
    }

    static associate(models) {
        this.belongsTo(models.Manufacturer, {
            foreignKey: 'manufacturer_id',
            as: 'manufacturer_fk'
        })
    }
}

module.exports = AircraftModel;