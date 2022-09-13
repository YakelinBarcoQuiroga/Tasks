const express = require("express");

//Routes
const { tasksRouter } = require("./routes/tasks.routes");
const { usersRouter } = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/users", usersRouter);


app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    messagel: `${res.method} ${req.url} doesn't exist`,
  });
});

module.exports = { app };
