const { Sequelize } = require("sequelize");
const path = require("path");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "storage.sqlite"),
});

module.exports = db;
