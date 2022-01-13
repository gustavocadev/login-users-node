const renderPages = require("./renderPages.controllers");
const renderNoteForm = require("./notes.controllers");
const users = require("./users.controllers");

module.exports = {
    ...renderPages,
    ...renderNoteForm,
    ...users,
};
