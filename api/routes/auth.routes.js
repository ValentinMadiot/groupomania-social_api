const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controllers");
const validEmail = require("../middleware/validator.mail");
const validPassword = require("../middleware/validator.pass");

//* ROUTES
router.post("/signup", validEmail, validPassword, authCtrl.signup);
router.post("/login", login);

module.exports = router;
