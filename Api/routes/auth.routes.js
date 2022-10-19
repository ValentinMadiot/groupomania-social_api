//* IMPORT
const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controllers");

//* ROUTES
router.post("/signup", signup);
router.post("/login", login);

//* EXPORT DES ROUTES
module.exports = router;
