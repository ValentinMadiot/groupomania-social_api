//! IMPORT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");

//! CONTROLLER USERS

//* SIGNUP
const signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }
    user = await User.create({ ...req.body });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs doivent être remplis" });
  }
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        res.status(400).json({error : "Mot de passe incorrect"});
      } else {
        const token = jwt.sign({
            mail: user.email,
            id: user._id,
          },
          process.env.JWT_TOKEN,
          { expiresIn: process.env.JWT_TIME }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json({error : "Adresse email incorrecte"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* EXPORT DONNEES
module.exports = { signup, login };