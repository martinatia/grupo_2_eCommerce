module.exports = (sequelize, dataTypes) => {
    let alias = 'products';
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        product_description: {
            type: dataTypes.STRING(250)
        },
        product_image_url: {
            type: dataTypes.STRING(250)
        },
        product_price: {
            type: dataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        product_section: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: dataTypes.INTEGER,
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