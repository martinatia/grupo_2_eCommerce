module.exports = (sequelize, dataTypes) => {
    let alias = 'ventas_products';
    let cols = {
        venta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monto_parcial: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    };
let config = {
    timestamps: false,
    tableName: 'ventas_products'
}
const ventas_products = sequelize.define(alias, cols, config);

ventas_products.associate = (models) => {

    ventas_products.belongsTo(models.ventas, {
        foreignKey: 'venta_id',
        as: 'venta'
    });
    ventas_products.belongsTo(models.products, {
        foreignKey: 'product_id',
        as: 'product'
    });
    ventas_products.belongsTo(models.sizes, {
        foreignKey: 'size_id',
        as: 'size'
    });
};
return ventas_products
};