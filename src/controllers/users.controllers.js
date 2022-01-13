const { User } = require("../models");
const passport = require("passport");

// render view
const renderSignUpForm = (req, res) => {
    res.render("users/signup");
};

const signup = async (req, res) => {
    const { name, password, email, confirm_password } = req.body;

    const newUser = new User({
        name,
        password,
        email,
        confirm_password,
    });

    newUser.password = await newUser.encryptPassword(password);

    req.flash("success_msg", "You are registered :D");

    await newUser.save();

    res.redirect("/users/signin");
};

// render view
const renderSignInForm = (req, res) => {
    res.render("users/signin");
};

const signin = passport.authenticate("local", {
    failureRedirect: "/users/signin",
    successRedirect: "/notes",
    failureFlash: true,
});

const logout = (req, res) => {
    req.logout();

    req.flash("success_msg", "Tu sesión ya está cerrada :D");
    res.redirect("/users/signin");
};

module.exports = {
    renderSignUpForm,
    signup,
    signin,
    logout,
    renderSignInForm,
};
