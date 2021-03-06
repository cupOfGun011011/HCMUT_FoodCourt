const express = require("express");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const User = require("../models/user");
const path = require("path");

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  user.balance = 0;
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send();
    const user = await User.findCretidentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/me", authenticate, async (req, res) => {
  res.send(req.user);
});

router.post("/user/logout", authenticate, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/user/logoutAll", authenticate, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.patch("/user/me", authenticate, async (req, res) => {
  const newUser = req.body;
  const updates = Object.keys(newUser);
  const allowedUpdates = ["name", "password"];
  const isValidUpdates = updates.every((el) => {
    return allowedUpdates.includes(el);
  });
  if (!isValidUpdates)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const user = req.user;
    updates.forEach((key) => {
      user[key] = newUser[key];
    });

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/recharge", authenticate, async (req, res) => {
  const newUser = req.body;
  const updates = Object.keys(newUser);
  const allowedUpdates = ["balance"];
  const isValidUpdates = updates.every((el) => {
    return allowedUpdates.includes(el);
  });
  if (!isValidUpdates)
    return res.status(400).send({ error: "Invalid updates" });
  try {
    const user = req.user;
    updates.forEach((key) => {
      user[key] = newUser[key];
    });

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
