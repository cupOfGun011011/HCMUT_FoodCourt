const express = require("express");
const router = new express.Router();
const path = require("path");

router.get("/login", async (req, res) => {
  res.sendFile(path.resolve("dist/login.html"));
});
router.get("/", async (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

router.get("/order", async (req, res) => {
  res.sendFile(path.resolve("dist/order.html"));
});

module.exports = router;
