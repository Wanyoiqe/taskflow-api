// taskModel.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // ✅ Ensure every task belongs to a user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});

// ✅ Indexes
taskSchema.index({ user: 1, title: 1 }, { unique: true }); // Unique title per user
taskSchema.index({ user: 1, status: 1 }); // Query tasks by user + status
taskSchema.index({ createdAt: -1 }); // Sort by newest first
taskSchema.index({ dueDate: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired tasks
taskSchema.index({ description: "text" }); // Full-text search on description

const Task = mongoose.model("Task", taskSchema);

export default Task;
