const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.models");

//* GET ALL USERS
const getUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      const { password, ...details } = user._doc;
      return details;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//* GET ONE USER
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...details } = user._doc;
      res.status(200).json(details);
    } else {
      res.status(404).json({error: "Aucun utilisateur de ce type n'existe"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* UPDATE USER
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password, isAdmin } = req.body;
  if (id === _id || isAdmin) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: process.env.JWT_TIME }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res
      .status(403)
      .json("Accès refusé : Vous ne pouvez mettre à jour que votre propre profil !");
  }
};

//* DELETE USER
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { _id, admin } = req.body;
  if (id === _id || admin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("Utilisateur supprimé avec succès !");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Accès refusé : Vous ne pouvez supprimer que votre propre profil !");
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };