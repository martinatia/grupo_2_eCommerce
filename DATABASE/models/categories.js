module.exports = (sequelize, dataTypes) => {
    let alias = 'categories';
    let cols = {
        category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        category_description: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'categories'
    }
    const categories = sequelize.define(alias, cols, config); 

    categories.associate = function (models) {
        categories.hasMany(models.products, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return categories
};