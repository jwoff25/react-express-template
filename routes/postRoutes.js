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
      if (error.kind === "ObjectId")
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
      await post.remove();
      res.json({ msg: "Post removed." });
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found." });
      res.status(500).send("Server error");
    }
  });

  // Add/Remove like
  app.put("/api/posts/like/:post_id", auth, async (req, res) => {
    try {
      const postid = req.params.post_id;
      // Get post
      const post = await Post.findById(postid);
      if (!post) return res.status(404).json({ msg: "Post not found." });
      // Add a like with user id if user hasn't liked the post yet
      if (!post.likes.some(obj => obj.user.toString() === req.user.id)) {
        post.likes.push({
          user: req.user.id
        });
        // Remove the like if the user has already liked it
      } else {
        post.likes = post.likes.filter(
          obj => obj.user.toString() !== req.user.id
        );
      }
      // Save and return
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found." });
      res.status(500).send("Server error");
    }
  });

  // Add Comment
  app.post(
    "/api/posts/comment/:post_id",
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
      const postid = req.params.post_id;
      // Get user and post
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(postid);
      if (!post) return res.status(404).json({ msg: "Post not found." });
      try {
        // Create comment object
        const commentObject = {
          user: user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar
        };
        // Add to comments array
        post.comments.unshift(commentObject);
        await post.save();
        res.json(post);
      } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId")
          return res.status(404).json({ msg: "Post not found." });
        res.status(500).send("Server Error");
      }
    }
  );

  // Remove comment
  app.delete(
    "/api/posts/comment/:post_id/:comment_id",
    auth,
    async (req, res) => {
      try {
        const { post_id, comment_id } = req.params;
        // Get post
        const post = await Post.findById(post_id);
        // Get comment from post
        const comment = post.comments.find(
          comment => comment.id.toString() === comment_id
        );
        // Check if comment exists
        if (!comment)
          return res.status(404).json({ msg: "Comment not found." });
        // Check if user is owner of comment
        console.log(comment.user.toString() === req.user.id);
        if (comment.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ msg: "You are not authorized to perform this action." });
        } else {
          post.comments = post.comments.filter(
            comment => comment.id.toString() !== comment_id
          );
          await post.save();
          res.json(post);
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  );
};
