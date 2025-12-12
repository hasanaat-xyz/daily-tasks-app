// utils/generateTodayTasks.js
import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

export const generateTasksForToday = async () => {
  const today = new Date().toISOString().slice(0,10);

  // For each user
  const users = ["hasanaat", "humera", "hafsah"];

  for (let userName of users) {
    // Check if tasks already exist for today
    const existing = await Task.find({ userName, date: today });
    if (existing.length > 0) continue; // skip if already created

    // Fetch template tasks for the user
    const templates = await UserTask.find({ userName });

    // Create tasks for today
    
    const tasksForToday = templates.map(t => ({
      userName: t.userName,
      title: t.title,
      date: today
    }));

    await Task.insertMany(tasksForToday);
  }
};
