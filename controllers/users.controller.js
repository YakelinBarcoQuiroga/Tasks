const { Users } = require("../models/users.model");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await Users.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: "succes",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { status: "active" } });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const users = await Users.findOne({ where: { id } });

    if (!users) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await users.update({ name, email });

    res.status(200).json({
      status: "succes",
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await Users.findOne({ where: { id } });

    if (!users) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await users.update({ status: "cancelled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
