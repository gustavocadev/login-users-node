const { validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    const { name, password, email, confirm_password } = req.body;

    // if errors is not empty or passwords don't match:
    if (!errors.isEmpty() || password !== confirm_password) {
        // get the array of errors
        const { errors } = validationResult(req);
        //I create a copy
        let allErrors = [...errors];
        // I a set a message of error
        let passwordError;
        if (password !== confirm_password) {
            passwordError = {
                msg: "Las contraseñas no coiciden",
            };
            // I create a new array with the error
            allErrors = [...errors, passwordError];
        }

        res.render("users/signup", {
            allErrors,
            name,
            email,
        });
        console.log(allErrors);
        return;
    }

    next();
};

module.exports = {
    validateInputs,
};
