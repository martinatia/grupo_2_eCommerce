module.exports = (sequelize, dataTypes) => {
    let alias = 'ventas';
    let cols = {
        id_venta: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_venta: {
            type: dataTypes.DATE,
            allowNull: false
        },
        id_usuario_comprador: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio_total: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        payment_method: {
            type: dataTypes.STRING(45),
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