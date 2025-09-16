// controllers/taskController.js
import Task from "../models/taskModel.js";
import { validateTitle, validateDescription } from "../helpers.js";

// Get task by ID (only for logged-in user)
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // ✅ Extracted from JWT middleware
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id; // ✅ From JWT

    // Validation
    if (title) {
      try {
        validateTitle(title);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    if (description) {
      try {
        validateDescription(description);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    const task = new Task({ title, description, status, dueDate, user: userId });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ From JWT
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Get All Tasks by UserId (admin use only)
export const getTasksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ From JWT
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ From JWT
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
