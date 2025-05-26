const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(32)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

module.exports = (req, res, next) => {
  const failed = passwordSchema.validate(req.body.password, { list: true });

  if (failed.length === 0) {
    next();
  } else {
    const messages = {
      min: "au moins 8 caractères",
      max: "maximum 32 caractères",
      uppercase: "au moins 1 majuscule",
      lowercase: "au moins 1 minuscule",
      digits: "au moins 1 chiffre",
      spaces: "aucun espace autorisé",
    };

    const feedback = failed.map((rule) => messages[rule]).join(", ");
    return res.status(403).json({
      error: `Le mot de passe n'est pas assez fort : ${feedback}.`,
    });
  }
};
