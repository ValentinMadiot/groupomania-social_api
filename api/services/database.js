const mongoose = require("mongoose");

// Supprime l’avertissement Mongoose 7 (option strictQuery)
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI, {
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
