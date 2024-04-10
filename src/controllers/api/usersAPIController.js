const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Users = db.users;

const usersAPIController = {
  list: (req, res) => {
    Users.findAll().then((users) => {
      let respuesta = {
        meta: {
          status: 200,
          total: users.length,
          url: "api/users",
        },
        data: users,
      };
      res.json(respuesta);
    });
  },
  detail: (req, res) => {
    Users.findByPk(req.params.id).then((user) => {
      let respuesta = {
        meta: {
          status: 200,
          url: "api/users/:id", //TODO: Va asi? o debo reemplazar el id?
        },
        data: {
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          email: user.email,
          profile_image_url: `http://localhost:3001/img/usersImageProfile/${user.profile_image_url}`,
          date_created: user.date_created,
        },
      };
      res.json(respuesta);
    });
  },
  last_added: (req, res) => {
    Users.findAll({
      order: [["date_created", "DESC"]],
      limit: 1,
    }).then((user) => {
      console.log("last_added:", user);
      let respuesta = {
        meta: {
          status: 200,
          total: 1,
          url: "api/users/last_added",
        },
        data: user,
      };
      res.json(respuesta);
    });
  },
};

module.exports = usersAPIController;
