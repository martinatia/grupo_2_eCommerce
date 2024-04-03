module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        product_description: {
            type: DataTypes.STRING(250)
        },
        product_image_url: {
            type: DataTypes.STRING(250)
        },
        product_price: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        product_section: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        timestamps: false,
        tableName: 'products'
    }
    const products = sequelize.define(alias, cols, config); 

    products.associate = function (models) {
        products.belongsTo(models.categories, { 
            as: "category",
            foreignKey: "category_id"
        });
        products.belongsTo(models.brands, { 
            as: "brand",
            foreignKey: "brand_id"
        });
    }
    return products
};