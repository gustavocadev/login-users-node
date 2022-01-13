const { Router } = require("express");
const { check } = require("express-validator");
const {
    renderSignUpForm,
    renderSignInForm,
    signup,
    signin,
    logout,
} = require("../controllers");
const { existsEmail } = require("../helpers/db-validators");
const { validateInputs } = require("../middlewares/validateInputs");
const router = Router();
// render view
router.get("/users/signup", renderSignUpForm);

router.post(
    "/users/signup",
    [
        check("name", "el nombre es obligatorio").not().isEmpty(),
        check("email").custom((email) => existsEmail(email)),
        check("email", "El email no es valido").isEmail(),
        check(
            "password",
            "el password es obligatorio y más de 6 letras"
        ).isLength({ min: 4 }),
        validateInputs,
    ],
    signup
);

// render view
router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signin);

// logout

router.get("/users/logout", logout);

module.exports = router;
