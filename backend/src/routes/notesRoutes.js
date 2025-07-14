import express from 'express';
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById
} from '../controllers/notesControllers.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/", verifyToken, getAllNotes);
router.get("/:id", verifyToken, getNoteById);
router.post("/", verifyToken, createNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
