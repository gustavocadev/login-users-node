const { User, Note } = require("../models");

const renderNoteForm = (req, res) => {
    res.render("notes/new-note");
};

const createNewNote = async (req, res) => {
    const { description, title } = req.body;

    const newUser = new Note({ description, title });

    newUser.user = req.user.id;

    await newUser.save();

    req.flash("success_msg", "Note added successfully");

    res.redirect("/notes");
};

const renderNotes = async (req, res) => {
    const notes = await Note.find({
        $or: [{ user: req.user.id }],
    })
        .lean()
        .sort({ createdAt: "desc" });
    // console.log(notes);
    res.render("notes/all-notes", { notes });
};

const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const noteFound = await Note.findById(id).lean();
    if (noteFound.user != req.user.id) {
        return res.redirect("/notes");
    }
    res.render("notes/edit-note", { noteFound });
};

const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        console.log("el id no existe :(");
    }
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(id, { title, description });

    req.flash("success_msg", "Note updated successfully");

    res.redirect("/notes");
};

const deleteNote = async (req, res) => {
    const { id } = req.params;

    await Note.findByIdAndDelete(id, {
        new: true,
    });
    req.flash("success_msg", "Note deleted successfully");
    res.redirect("/notes");
};

module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote,
};
