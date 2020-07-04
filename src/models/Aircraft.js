const { Model, DataTypes } = require('sequelize');

class Aircraft extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            is_active: DataTypes.CHAR(1)
        }, {
            sequelize: connection,
            tableName: 'aircrafts'
        });
    }

    static associate(models) {
        this.belongsTo(models.Owner, {
            foreignKey: 'owner_id',
            as: 'owner_fk'
        });
        this.belongsTo(models.AircraftModel, {
            foreignKey: 'aircraft_model_id',
            as: 'aircraft_model_fk'
        });
    }
}

module.exports = Aircraft;