const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("../src/routers/user");
const mainRouter = require("../src/routers/main");
const productRouter = require("../src/routers/product");
const orderRouter = require("../src/routers/order");
const path = require("path");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(userRouter, mainRouter, productRouter, orderRouter);

module.exports = app;
