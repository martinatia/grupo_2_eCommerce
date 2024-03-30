module.exports = (sequelize, dataTypes) => {
    let alias = 'sizes';
    let cols = {
        size_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        size_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        tableName: 'sizes'
    }
    const sizes = sequelize.define(alias, cols, config); 


    return sizes
};