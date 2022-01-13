const { User } = require("../models");

const existsEmail = async (email) => {
    const emailFound = await User.findOne({ email });

    if (emailFound) {
        throw new Error("El correo ya está registrado :/");
    }
};

module.exports = {
    existsEmail,
};
