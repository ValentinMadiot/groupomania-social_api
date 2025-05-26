const mongoose = require("mongoose");

// On lit une NODE_ENV standard de Node.js
const env = process.env.NODE_ENV || "development";

// On récupère les deux URI depuis l’env
const uriDev = process.env.MONGODB_URI_DEV;
const uriProd = process.env.MONGODB_URI_PROD;

// On choisit la bonne URI suivant l’environnement
const uri = env === "production" ? uriProd : uriDev;

if (!uri) {
  console.error(
    `❌ Erreur : MONGODB_URI_${env.toUpperCase()} non défini dans .env`
  );
  process.exit(1);
}

// Supprime l’avertissement Mongoose 7 (option strictQuery)
mongoose.set("strictQuery", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie !");
  })
  .catch((error) => {
    console.error("❌ Connexion à MongoDB échouée :", error);
  });

module.exports = { mongoose };
