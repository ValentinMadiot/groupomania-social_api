const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie ! ");
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée ! " + error);
  });

module.exports = { mongoose };