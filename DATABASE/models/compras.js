module.exports = (sequelize, dataTypes) => {
    let alias = 'compras';
    let cols = {
        id_compra: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description_compra: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        total_price_compra: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        supplier: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        timestamps: false, 
        tableName: 'compras'
    }
    const compras = sequelize.define(alias, cols, config); 


    return compras
};