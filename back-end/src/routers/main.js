const express = require("express");
const router = new express.Router();
const path = require("path");

router.get("/login", async (req, res) => {
  res.sendFile(path.resolve("dist/login.html"));
});

module.exports = router;
