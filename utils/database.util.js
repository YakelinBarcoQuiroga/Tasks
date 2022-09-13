const { Sequelize, DataTypes } = require("sequelize");
//Establish bd connection database
const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "yake1213",
  port: 5432,
  database: "tasks",
  logging: false,
});

module.exports = { db, DataTypes };
