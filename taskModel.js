// models/taskModel.js
// const db = require("./config/db");

import db from "./config/db.js";



// ====== Validation Helpers ======


// ====== Task Model ======
const Task = {
  // Create Task
  create: async ({ title, description }) => {
    validateTitle(title);
    validateDescription(description);

    const [result] = await db.query(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [title, description, false]
    );

    return { id: result.insertId, title, description, completed: false };
  },

  // Update Task
  update: async (id, { title, description }) => {
    if (title) validateTitle(title);
    if (description) validateDescription(description);

    await db.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );

    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  },

  // Delete Task
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  // Find by ID
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  },

  // Find all tasks
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
  },
};
export {Task} ;


