const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Products = db.products;

const productsAPIController = {
  list: (req, res) => {
    Products.findAll({ include: ["brand"]}).then((product) => {
      let respuesta = {
        meta: {
          status: 200,
          total: product.length,
          url: "api/products",
        },
        data: {
            countBySection : {//El sprint hace referencia a este
                "in-sale": product.filter(product => product.product_section =="in-sale").length,
                "featured": product.filter(product => product.product_section=="featured").length,
                "last-colection": product.filter(product => product.product_section=="last-colection").length
            },
            countByCategory :{
                "kids": product.filter(product => product.category_id == 1).length,
                "Women": product.filter(product => product.category_id ==2).length,
                "Men": product.filter(product => product.category_id ==3).length
            },
            products :  product
        },
      };
      res.json(respuesta);
    });
  },
  detail: (req, res) => {
    Products.findByPk(req.params.id).then((product) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "api/products/:id", //TODO: Va asi? o debo reemplazar el id?
        },
        data: product
      };
      res.json(respuesta);
    });
  }
};

module.exports = productsAPIController;
