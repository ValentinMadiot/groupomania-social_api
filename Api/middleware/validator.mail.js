const { isEmail } = require("validator");

const validEmail = (req, res, next) => {
   const { email } = req.body;
   if (isEmail(email)) {
      next();
   } else {
      return res
         .status(403)
         .json({ error: `${email} n'est pas un email valide` });
   }
};

module.exports = validEmail