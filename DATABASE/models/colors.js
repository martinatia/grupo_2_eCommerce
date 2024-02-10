module.exports = (sequelize, dataTypes) => {
    let alias = 'colors';
    let cols = {
        color_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        color_name: {
            type: dataTypes.STRING(20),
            allowNull: false
        }
    };
    let config = {
        timestamps: false, 
        tableName: 'colors'
    }
    const colors = sequelize.define(alias, cols, config); 


    return colors
};