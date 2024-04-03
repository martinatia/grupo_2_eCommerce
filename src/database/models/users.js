module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        profile_image_url: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        user_type: {
            type: dataTypes.STRING(15),
            allowNull: false,
            defaultValue: 'Cliente'
        },
        date_created: {
            type: dataTypes.DATE,
            allowNull: false
        }
    };
    let config = {
        timestamps: false, 
        tableName: 'users'
    }
    const users = sequelize.define(alias, cols, config); 

    return users
};