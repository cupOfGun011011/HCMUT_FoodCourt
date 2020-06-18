const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("../src/routers/user");
const mainRouter = require("../src/routers/main");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(userRouter, mainRouter);

module.exports = app;
