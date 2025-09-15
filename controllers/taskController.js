// controllers/taskController.js
import { validateTitle, validateDescription } from '../helpers.js'
import {Task} from '../taskModel.js'



// ================= CREATE TASK =================
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (title) validateTitle(title);
    if (description) validateDescription(description);

    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// ================= GET ALL TASKS =================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ================= GET TASK BY ID =================
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (title) validateTitle(title);
    if (description) validateDescription(description);

    const updatedTask = await Task.update(req.params.id, { title, description });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// ================= EXPORT =================
export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

