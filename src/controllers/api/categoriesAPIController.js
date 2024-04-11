const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Categories = db.categories;

const categoriesAPIController = {
  list: (req, res) => {
    Categories.findAll().then((categories) => {
      let respuesta = {
        meta: {
          status: 200,
          total: categories.length,
          url: "api/categories",
        },
        data: categories
      };
      res.json(respuesta);
    });
  },
  detail: (req, res) => {
    Categories.findByPk(req.params.id).then((category) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "api/categories/:id", //TODO: Va asi? o debo reemplazar el id?
        },
        data: category
      };
      res.json(respuesta);
    });
  }
};

module.exports = categoriesAPIController;
