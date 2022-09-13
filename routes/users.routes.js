const express = require("express");

//Controllers
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.post("/", createUser);

usersRouter.patch("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

module.exports = { usersRouter };
