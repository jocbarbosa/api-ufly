const { Model, DataTypes } = require('sequelize');

class Flight extends Model {
    static init(connection) {
        super.init({
            status: DataTypes.STRING,
            estimative_time: DataTypes.STRING,
            price: DataTypes.FLOAT,
            datetime: DataTypes.DATE,
            rating: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'flights'
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_fk'
        });
        this.belongsTo(models.Aircraft, {
            foreignKey: 'aircraft_id',
            as: 'aircraft_fk'
        });
        this.belongsTo(models.City, {
            foreignKey: 'city_id_from',
            as: 'city_from_fk'
        });
        this.belongsTo(models.City, {
            foreignKey: 'city_id_to',
            as: 'city_to_fk'
        });
    }
}

module.exports = Flight;