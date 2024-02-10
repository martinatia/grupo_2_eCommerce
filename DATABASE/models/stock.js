module.exports = (sequelize, dataTypes) => {
    let alias = 'stock';
    let cols = {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    };
    let config = {
        timestamps: false, 
        tableName: 'stock'
    }
    const stock = sequelize.define(alias, cols, config); 
    
    Stock.associate = (models) => {

        Stock.belongsTo(models.products, {
            foreignKey: 'product_id',
            as: 'product'
        });


        Stock.belongsTo(models.colors, {
            foreignKey: 'color_id',
            as: 'colors'
        });


        Stock.belongsTo(models.sizes, {
            foreignKey: 'size_id',
            as: 'sizes'
        });
    };

    return stock
};