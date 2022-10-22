const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(32)
  .has().digits(1)
  .has().uppercase(1)
  .has().not().spaces();

const validPassword = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(403).json({
      error: `Le mot de passe doit contenir entre 8 et 32 caractères avec au moins un chiffre et une majuscule`,
    });
  }
};

module.exports = validPassword;