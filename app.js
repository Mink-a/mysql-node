import express from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "./db.js";

const port = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("helo from home page");
});

app.get("/notes", async (req, res) => {
  const allNotes = await getNotes();
  res.send(allNotes);
});

app.get("/notes/:id", async (req, res) => {
  const singleNoteId = req.params.id;
  const singleNote = await getNoteById(singleNoteId);
  res.send(singleNote);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const newNote = await createNote(title, contents);
  res.send(newNote);
});

app.patch("/notes/:id", async (req, res) => {
  const { title, contents } = req.body;
  const id = req.params.id;
  const editedNote = await updateNote(id, title, contents);
  res.send(editedNote);
});

app.delete("/notes/:id", async (req, res) => {
  const singleNoteId = req.params.id;
  const removeNote = await deleteNote(singleNoteId);
  res.send(removeNote);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
