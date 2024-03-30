module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        profile_image_url: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        user_type: {
            type: DataTypes.STRING(15),
            allowNull: false,
            defaultValue: 'Cliente'
        },
        date_created: {
            type: DataTypes.DATE,
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