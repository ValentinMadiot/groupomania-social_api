const Post = require("../models/Post.models");
const { unlink } = require("fs");
const { uploader } = require("../services/cloudinary");

//* CREATE
const createPost = async (req, res) => {
  const reqPost = req.body;
  const newPost = new Post({
    ...reqPost,
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* GET ALL
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(
      posts
        .filter((post) => post != null)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* GET ONE
const getOnePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* MODIFY
const modifyPost = async (req, res) => {
  const postId = req.params.id;
  const { userId, admin } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post introuvable" });
    if (!(admin || post.userId === userId)) {
      return res.status(403).json({ error: "Modification non autorisée" });
    }

    const oldImage = post.image;
    const newImage = req.body.image;
    const isProd = process.env.NODE_ENV === "production";

    // Cas 1 : suppression manuelle d'image (champ image supprimé dans la requête)
    if (!newImage && oldImage) {
      if (isProd && oldImage.startsWith("https://res.cloudinary.com")) {
        const publicId = oldImage.split("/").pop().split(".")[0];
        await uploader.destroy(`groupomania-social/${publicId}`);
      } else {
        const filename = oldImage.split("/public/images/")[1];
        if (filename) unlink(`public/images/${filename}`, () => {});
      }
    }

    // Cas 2 : remplacement d'image
    if (newImage && newImage !== oldImage && oldImage) {
      if (isProd && oldImage.startsWith("https://res.cloudinary.com")) {
        const publicId = oldImage.split("/").pop().split(".")[0];
        await uploader.destroy(`groupomania-social/${publicId}`);
      } else {
        const filename = oldImage.split("/public/images/")[1];
        if (filename) unlink(`public/images/${filename}`, () => {});
      }
    }

    await post.updateOne({ $set: req.body });
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* DELETE
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId, admin } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post introuvable" });
    if (!(admin || post.userId === userId)) {
      return res.status(403).json({ error: "Suppression non autorisée" });
    }

    const image = post.image;
    const isProd = process.env.NODE_ENV === "production";

    if (image) {
      if (isProd && image.startsWith("https://res.cloudinary.com")) {
        const publicId = image.split("/").pop().split(".")[0];
        await uploader.destroy(`groupomania-social/${publicId}`);
      } else {
        const filename = image.split("/public/images/")[1];
        if (filename) unlink(`public/images/${filename}`, () => {});
      }
    }

    await post.deleteOne();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* LIKE
const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked !");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked !");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* EXPORTER LES FONCTIONS "...Post"
module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  modifyPost,
  deletePost,
  likePost,
};
