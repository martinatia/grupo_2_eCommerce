module.exports = (sequelize, dataTypes) => {
    let alias = 'compras';
    let cols = {
        id_compra: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_compra: {
            type: dataTypes.DATE,
            allowNull: false
        },
        description_compra: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        total_price_compra: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        payment_method: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        supplier: {
            type: dataTypes.STRING(100),
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