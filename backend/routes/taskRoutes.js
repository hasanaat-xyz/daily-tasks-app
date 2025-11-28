import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET tasks by username + date
router.get("/:userName/:date", async (req, res) => {
  try {
    const { userName, date } = req.params;
    const tasks = await Task.find({ userName, date });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// CREATE task
router.post("/", async (req, res) => {
  try {
    const { userName, title, date } = req.body;

    const task = new Task({
      userName,
      title,
      date
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TOGGLE complete
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    task.missed = false;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
