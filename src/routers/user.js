const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send();
    const user = await User.findCretidentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter(token => token.token !== req.token);
    await user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
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

router.patch("/users/me", auth, async (req, res) => {
  const newUser = req.body;
  const updates = Object.keys(newUser);
  const allowedUpdates = ["name", "age", "email", "password"];
  const isValidUpdates = updates.every(el => {
    return allowedUpdates.includes(el);
  });
  if (!isValidUpdates)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const user = req.user;
    updates.forEach(key => {
      user[key] = newUser[key];
    });

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send("User is deleted");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

const avatar = multer({
  //dest: "avatar", // If remove this line, data will store at req.file
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ["jpg", "jpeg", "png"];
    // file.jpg
    let isValidType = false;
    for (const type of allowedTypes) {
      if (file.originalname.endsWith(type)) {
        isValidType = true;
        break;
      }
    }
    if (!isValidType) return cb(new Error("Please upload image file"));
    return cb(undefined, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  avatar.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    console.log(req.user);
    await req.user.save();
    res.send();
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user || !user.avatar) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
});

module.exports = router;
