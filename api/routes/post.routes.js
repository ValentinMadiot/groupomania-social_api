const express = require("express");
const requireAuth = require("../middleware/auth");
const { createPost, getAllPosts, getOnePost, modifyPost, deletePost, likePost, } = require("../controllers/post.controllers");
const router = express.Router();

//* ROUTES
//! Test
// router.get("/", async (req, res) => {
//   res.send(" Post Router Test");
// });

router.use(requireAuth);
router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", modifyPost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);

module.exports = router;