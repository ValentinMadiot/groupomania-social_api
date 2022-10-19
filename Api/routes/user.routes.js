//* IMPORT
const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
// router.get('/', async (req, res) => {
//    res.send("User Router : Success ")
// })

// router.use(requireAuth);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
