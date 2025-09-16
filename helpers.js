import mongoose from 'mongoose';
import Task from './models/taskModel.js';

export function countWords(text) {
  return text.trim().split(/\s+/).length;
}

export async function validateTitle(title) {
  if (!title || String(title).trim() === "") {
    throw new Error("Title is required");
  }

  const value = String(title);

  if (!/^[A-Za-z\s]+$/.test(value)) {
    throw new Error("Title must only contain letters and spaces");
  }
  if (countWords(value) > 25) {
    throw new Error("Title must not exceed 25 words");
  }
}


export function validateDescription(description) {
  if (!description || String(description).trim() === "") {
    throw new Error("Description is required");
  }

  const value = String(description);

  if (countWords(value) > 300) {
    throw new Error("Description must not exceed 300 words");
  }
}