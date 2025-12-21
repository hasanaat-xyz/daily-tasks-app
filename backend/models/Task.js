import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      enum: ["hasanaat", "humera", "hafsah"],
    },

    title: {
      type: String,
      required: true,
    },

    date: {
      type: String, // "YYYY-MM-DD"
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
    missed: {
      type: Boolean,
      default: false,
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
