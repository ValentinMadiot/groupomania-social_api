const Post = require("../models/Post.models");
const { unlink } = require("fs");

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
    if (admin || post.userId === userId) {
      if ((req.body.image && post.image) || post.image) {
        const filename = post.image.split("public/images/")[0];
        unlink(`public/images/${filename}`, () => {});
      }
      await post.updateOne({ $set: req.body });
      res.status(200).json(req.body);
    } else {
      res.status(403).json({error : "Vous ne pouvez mettre à jour que vos propres messages !"});
    }
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
    if (admin || post.userId === userId) {
      if (post.image) {
        const filename = post.image.split("public/images/")[0];
        unlink(`public/images/${filename}`, () => {
          post.deleteOne();
        });
      }
      post.deleteOne();
      res.status(200).json(post);
    } else {
      res.status(403).json({error : "Vous ne pouvez mettre à jour que vos propres messages !"});
    }
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
module.exports = { createPost, getAllPosts, getOnePost, modifyPost, deletePost, likePost };