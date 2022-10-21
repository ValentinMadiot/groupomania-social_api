//* IMPORT
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//* SCHEMA UTILISATEUR
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true },
);

//* VERIFICATION DU SCHEMA UTILISATEUR UNIQUE AVEC LE VALIDATEUR MONGOOSE
userSchema.plugin(uniqueValidator);

//* EXPORTATION DU MODELE UTILISATEUR
module.exports = mongoose.model("User", userSchema);