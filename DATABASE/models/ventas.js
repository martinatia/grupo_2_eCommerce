module.exports = (sequelize, dataTypes) => {
    let alias = 'ventas';
    let cols = {
        id_venta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_venta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_usuario_comprador: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }
let config = {
    timestamps: false,
    tableName: 'ventas'
}
const ventas = sequelize.define(alias, cols, config);

ventas.associate = (models) => {

    ventas.belongsTo(models.users, {
        foreignKey: 'id_usuario_comprador',
        as: 'usuario_comprador'
    })
};
return ventas
};