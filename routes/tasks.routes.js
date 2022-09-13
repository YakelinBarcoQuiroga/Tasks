const express = require("express");

//Controllers
const {
  getAllTasks,
  createTasks,
  updateTasks,
  deleteTask,
  getTasksStatus,
} = require("../controllers/tasks.controller");

const tasksRouter = express.Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:status", getTasksStatus);

tasksRouter.post("/", createTasks);

tasksRouter.patch("/:id", updateTasks);

tasksRouter.delete("/:id", deleteTask);

module.exports = { tasksRouter };
