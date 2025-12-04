import Task from "../models/Task.js";

/* ===================================
   ✅ CREATE TASK
=================================== */
export const createTask = async (req, res) => {
  try {
    const { title, userId, date } = req.body;

    const newTask = new Task({
      title,
      userId,
      date,
      status: "pending",
    });

    await newTask.save();

    res.status(201).json({
      message: "✅ Task created",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error creating task",
      error: error.message,
    });
  }
};

// get all ttasks by users

export const getAllTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    
    res.status(500).json({
      message: "❌ Error fetching tasks",
      error: error.message,
    });
  }
};

/* ===================================
   ✅ UPDATE TASK STATUS
=================================== */
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json({
      message: "✅ Task updated",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating task",
      error: error.message,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "✅ Task deleted" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error deleting task",
      error: error.message,
    });
  }
};
