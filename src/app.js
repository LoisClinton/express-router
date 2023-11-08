const express = require("express");
const app = express();
const fruitRouter = require("../routes/fruits.js");
const userRouter = require("../routes/users.js");

app.use("/fruits", fruitRouter);
app.use("/users", userRouter);

app.use(express.json());
app.use(express.urlencoded());

module.exports = app;
