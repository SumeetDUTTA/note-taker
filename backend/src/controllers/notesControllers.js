import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 }); // Show the newest notes first
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error in getAllNotes notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Error fetching note" });
  }
}

export async function createNote(req, res) {
  try {
    const {title, content} = req.body
    const note = new Note({
      title,
      content,
      user: req.user.userId,
      });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(500).json({ message: "Error creating note" });
  }
}

export async function updateNote(req, res) {
  try {
    const {title, content} = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, content },
      { new: true }
    );
    if(!updatedNote) return res.status(404).json({message: "Note not found"});

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Error updating note" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!deletedNote) return res.status(404).json({message: "note not found"});
    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
}