const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            // match email's users
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, {
                    message: "Not User Found :'(",
                });
            }

            // match passwords
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return done(null, false, {
                    message: "Incorrect password",
                });
            }
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user);
    })
        .clone()
        .catch((err) => {
            console.log(err);
        });
});

module.exports = {
    LocalStrategy,
};
