import express from "express";
import { CreateNote, DeleteUserNotes, getNoteById, getUserNotes, UpdateUserNotes } from "../Controllers/notesControllers.js";

const router = express.Router();

router.get("/", getUserNotes);

router.get("/:id", getNoteById);

router.post("/", CreateNote);

router.put("/:id", UpdateUserNotes);

router.delete("/:id", DeleteUserNotes);

export default router;