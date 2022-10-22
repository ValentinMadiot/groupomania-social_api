//* IMPORT MONGOOSE
const mongoose = require("mongoose");

//* CREER SCHEMA POST
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, required: false },
    image: { type: String },
    likes: { type: [] },
  },
  { timestamps: true }
);

//* EXPORTATION DU MODELE DE SCHEMA
module.exports = mongoose.model("Post", postSchema);