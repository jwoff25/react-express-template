const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = app => {
  // Create a post
  app.post(
    "/api/posts",
    [
      auth,
      [
        check("text", "Text is required.")
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      // Get validation results
      const errors = validationResult(req);
      // If there are errors, send 400
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      // Get user
      const user = await User.findById(req.user.id).select("-password");
      try {
        // Create Post object
        const postObject = {
          user: user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar
        };
        const post = new Post(postObject);
        // Save post
        await post.save();
        res.json(post);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  );

  // Get all posts
  app.get("/api/posts", auth, async (req, res) => {
    try {
      // Get and sort posts by most recent
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  });

  // Get post by id
  app.get("/api/posts/:post_id", auth, async (req, res) => {
    try {
      const postid = req.params.post_id;
      // Get post by ID
      const post = await Post.findById(postid);
      if (!post) return res.status(404).json({ msg: "Post not found." });
      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId")
        return res.status(404).json({ msg: "Post not found." });
      res.status(500).send("Server error");
    }
  });

  // Delete post
  app.delete("/api/posts/:post_id", auth, async (req, res) => {
    try {
      const postid = req.params.post_id;
      // Get post by ID
      const post = await Post.findById(postid);
      if (!post) return res.status(404).json({ msg: "Post not found." });
      // Check if user created the post
      if (post.user.toString() !== req.user.id)
        return res.status(401).json({ msg: "User not authorized" });
      // Remove the post
      post.remove();
      res.json({ msg: "Post removed." });
    } catch (error) {
      console.error(error.message);
      if (error.kind == "ObjectId")
        return res.status(404).json({ msg: "Post not found." });
      res.status(500).send("Server error");
    }
  });
};
