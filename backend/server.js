import { generateTasksForToday } from "./utils/generateTodayTasks.js";
mongoose

  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // generate today's tasks
    await generateTasksForToday();
    console.log("✅ Today's tasks generated");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
});
  }) .catch((err) => console.error("❌ MongoDB error:", err.message));

