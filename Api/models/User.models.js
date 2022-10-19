//* IMPORT
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

//* SCHEMA UTILISATEUR
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 50,
    minlength: 5,
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
});

// userSchema.statics.signup = async function (
//   email,
//   password,
//   firstname,
//   lastname
// ) {
//   if (!email || !password) {
//     throw Error("All fileds must be filled");
//   }

//   if (!validator.isEmail(email)) {
//     throw Error("Email is not valid");
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password not strong enough");
//   }

//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email already in use");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({
//     email,
//     password: hash,
//     firstname,
//     lastname,
//   });

//   return user;
// };

// userSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fileds must be filled");
//   }

//   const user = await this.findOne({ email });

//   if (!user) {
//     throw Error("Inccorect email");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   return user;
// };

//* VERIFICATION DU SCHEMA UTILISATEUR UNIQUE AVEC LE VALIDATEUR MONGOOSE
userSchema.plugin(uniqueValidator);

//* EXPORTATION DU MODELE UTILISATEUR
module.exports = mongoose.model("User", userSchema);
