const express = require("express");
const router = new express.Router();
const path = require("path");

router.get("/login", async (req, res) => {
  res.sendFile(path.resolve("dist/login/index.html"));
});
router.get("/menu", async (req, res) => {
  res.sendFile(path.resolve("dist/menu/index.html"));
});
router.get("/", async (req, res) => {
  res.redirect("/menu");
});

router.get("/order", async (req, res) => {
  res.sendFile(path.resolve("dist/order/index.html"));
});
router.get("/recharge", async (req, res) => {
  res.sendFile(path.resolve("dist/recharge/index.html"));
});
module.exports = router;
