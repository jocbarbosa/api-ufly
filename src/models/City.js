const { Model, DataTypes } = require('sequelize');

class City extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            is_active: DataTypes.CHAR(1)
        }, {
            sequelize: connection,
            tableName: 'cities'
        })
    }

    static associate(models) {
        this.belongsTo(models.Country, {
            foreignKey: 'country_id',
            as: 'country_fk'
        })
    }
}

module.exports = City;