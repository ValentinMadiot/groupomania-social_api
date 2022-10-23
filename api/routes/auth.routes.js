const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controllers");
const mail = require ('../middleware/validator.mail')
const pass = require ('../middleware/validator.pass')

//* ROUTES
router.post("/signup", mail, pass, signup);
router.post("/login", login);

module.exports = router;