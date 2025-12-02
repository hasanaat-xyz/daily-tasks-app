import Task from "../models/Task.js";

// Every day at midnight
setInterval(async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    await Task.updateMany(
      {
        date: { $lt: today },
        status: "pending"
      },
      {
        status: "missed"
      }
    );
    console.log("✅ Pending tasks marked as missed");

  } catch (error) {
    console.error("❌ Cron error:", error.message);
  }
}, 1000 * 60 * 60 * 24); // 24 hours
