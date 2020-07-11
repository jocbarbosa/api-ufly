const { Model, DataTypes } = require('sequelize');

class Country extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            flag_image: DataTypes.STRING,
            image: DataTypes.STRING,
            is_active: DataTypes.CHAR(1),
            nationality: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'countries'
        })
    }

    static associate(models) {
        this.hasMany(models.City, {
            foreignKey: 'country_id',
            as: 'cities'
        });
    }
}

module.exports = Country;