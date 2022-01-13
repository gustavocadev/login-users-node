const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "el titulo es requerido"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "La descripción es requerida :/"],
            trim: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Note", NoteSchema);
