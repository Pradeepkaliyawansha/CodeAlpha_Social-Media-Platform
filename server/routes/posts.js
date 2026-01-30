import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username name")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = new Post({
      user: req.user._id,
      content,
    });

    await post.save();
    await post.populate("user", "username name");

    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Like/unlike post
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({ isLiked: !isLiked, likesCount: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get post comments
router.get("/:id/comments", auth, async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "username name")
      .sort({ createdAt: 1 });

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add comment
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      post: req.params.id,
      user: req.user._id,
      content,
    });

    await comment.save();
    await comment.populate("user", "username name");

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
