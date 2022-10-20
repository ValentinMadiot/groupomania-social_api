//* IMPORT
const mongoose = require("mongoose");

//* CONNEXTION A LA BASE DE DONNEE MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie ! ");
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée ! " + error);
  });

//* EXPORT
module.exports = { mongoose };