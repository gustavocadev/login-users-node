const { Router } = require("express");
const router = Router();
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    updateNote,
    renderEditForm,
    deleteNote,
} = require("../controllers");
const { isAuthenticated } = require("../middlewares/auth");

// new note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// get all notes
router.get("/notes", isAuthenticated, renderNotes);

// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, updateNote);

// Delete notes

router.delete("/notes/delete/:id", isAuthenticated, deleteNote);
module.exports = router;
