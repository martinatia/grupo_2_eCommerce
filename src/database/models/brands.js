module.exports = (sequelize, dataTypes) => {
    let alias = 'brands';
    let cols = {
        brand_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        brand_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'brands'
    }
    const brands = sequelize.define(alias, cols, config); 

    brands.associate = function (models) {
        brands.hasMany(models.products, {
            as: "products",
            foreignKey: "brand_id"
        })
    }

    return brands
};