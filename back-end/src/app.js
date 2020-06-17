const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("../src/routers/user");

app.use(express.json());
app.use(express.static("dist"));
app.use(userRouter);

module.exports = app;
