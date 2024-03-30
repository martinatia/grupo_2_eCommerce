module.exports = (sequelize, dataTypes) => {
    let alias = 'stock';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    };
    let config = {
        timestamps: false, 
        tableName: 'stock'
    }
    const stock = sequelize.define(alias, cols, config); 
    
    stock.associate = (models) => {

        stock.belongsTo(models.products, {
            foreignKey: 'product_id',
            as: 'product'
        });
        stock.belongsTo(models.sizes, {
            foreignKey: 'size_id',
            as: 'size'
        })
    };

    return stock
};