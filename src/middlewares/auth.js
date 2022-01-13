const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/users/signin");
    }

    next();
};

module.exports = {
    isAuthenticated,
};
