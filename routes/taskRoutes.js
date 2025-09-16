import express from "express";
const router = express.Router();

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

// ✅ Protected routes (user must be logged in with JWT)
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
