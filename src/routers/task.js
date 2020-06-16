const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  // try {
  //   await task.save();
  //   res.status(201).send(task);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
});
// GET /tasks/?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    let completed = req.query.completed;
    if (completed) {
      completed = completed.toLowerCase() === "true";
      match.completed = completed;
    }
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    const user = req.user;
    await user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: !!parseInt(req.query.limit)
            ? parseInt(req.query.limit)
            : undefined,
          skip: !!parseInt(req.query.skip) ? parseInt(req.query.skip) : 0,
          sort
        }
      })
      .execPopulate();
    if (!user.tasks) return res.status(404).send();
    res.send(user.tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }

  // Task.find({})
  //   .then(tasks => {
  //     return res.status(200).send(tasks);
  //   })
  //   .catch(e => {
  //     res.status(500).send("Server is now unavailabel");
  //   });
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const task = await Task.findOne({ _id: _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server is now unavailable");
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const newTask = req.body;
  const _id = req.params.id;
  const updates = Object.keys(newTask);
  const allowedUpdates = ["completed", "description"];
  const isValidUpdates = updates.every(el => {
    return allowedUpdates.includes(el);
  });
  if (!isValidUpdates)
    return res.status(400).send({ error: "Invalid Updates" });

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    updates.forEach(update => {
      task[update] = newTask[update];
    });
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) res.status(404).send();
    await task.remove();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
