//Models
const { Tasks } = require("../models/tasks.model");

const createTasks = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Tasks.create({
      title,
      userId,
      startDate,
      limitDate,
    });

    res.status(201).json({
      status: "succes",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTasksStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Tasks.findAll({ where: { status: status } });

    if (!tasks) {
      return res.status(404).json({
        status: "error",
        message: "The state you are trying to find does not exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTasks = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { id } = req.params;

    const tasks = await Tasks.findOne({ where: { id } });

    const EntrylimitDate = new Date(tasks.limitDate).getTime();
    const EntryfinishDate = new Date(finishDate).getTime();

    subtractionOfDates = EntrylimitDate - EntryfinishDate;

    if (subtractionOfDates > 0) {
      await tasks.update({ finishDate, status: 'completed' });
    } else if (subtractionOfDates < 0) {
      await tasks.update({ finishDate, status: 'late' });
    }
    
    if (!tasks) {
      return res.status(404).json({
        status: "error",
        message: "Tasks not found",
      });
    }

    res.status(200).json({
      status: "succes",
      data: { tasks },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Tasks.findOne({ where: { id } });

    if (!tasks) {
      return res.status(404).json({
        status: "error",
        message: "Tasks not found",
      });
    }

    await tasks.update({ status: "cancelled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTasks,
  getAllTasks,
  getTasksStatus,
  createTasks,
  updateTasks,
  deleteTask,
};
