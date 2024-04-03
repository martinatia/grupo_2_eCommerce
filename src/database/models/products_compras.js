module.exports = (sequelize, dataTypes) => {
    let alias = 'products_compras';
    let cols = {
        id_products_compras: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        compra_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        timestamps: false,
        tableName: 'products_compras'
    }
    const products_compras = sequelize.define(alias, cols, config); 

    products_compras.associate = function (models) {
        products_compras.belongsTo(models.compras, {
            foreignKey: 'compra_id',
            as: 'compra'
        });
        products_compras.belongsTo(models.products, {
            foreignKey: 'product_id',
            as: 'product'
        });
        products_compras.belongsTo(models.sizes, {
            foreignKey: 'size_id',
            as: 'size'
        });
    }
    return products_compras;
};