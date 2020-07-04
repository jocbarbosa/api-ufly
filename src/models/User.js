const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            birthday: DataTypes.DATE,
            is_active: DataTypes.STRING,
            passport: DataTypes.STRING,
            passport_emitter: DataTypes.STRING,
            passport_shelf_life: DataTypes.STRING

        }, {
            sequelize: connection,
            tableName: 'users'
        });
    }

    static associate(models) {
        this.belongsTo(models.Country, {
            foreignKey: 'country_id',
            as: 'country_fk'
        });
    }
}

module.exports = User;