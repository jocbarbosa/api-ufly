const { Model, DataTypes } = require('sequelize');

class Pilot extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            registration: DataTypes.STRING,
            birthday: DataTypes.DATEONLY
        }, {
            sequelize: connection,
            tableName: 'pilots'
        })
    }

    static associate(models) {
        this.belongsTo(models.Owner, {
            foreignKey: 'owner_id',
            as: 'owner_id_fk'
        });
    }
}


module.exports = Pilot;