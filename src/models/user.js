const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.encryptPassword = async function (password = "") {
    const salt = await bcryptjs.genSalt();
    return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password = "") {
    return await bcryptjs.compare(password, this.password);
};

module.exports = model("User", UserSchema);
