const { Model, DataTypes } = require('sequelize');

class Owner extends Model {
    static init(connection) {
        super.init({
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            type: DataTypes.CHAR(1),
            name: DataTypes.STRING,
            is_active: DataTypes.CHAR(1),
            rating: DataTypes.INTEGER,
            image: DataTypes.STRING,

        }, {
            sequelize: connection,
            tableName: 'owners'
        })
    }
}


module.exports = Owner;