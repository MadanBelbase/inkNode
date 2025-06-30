import { Request, Response } from "express";
import mongoose from "mongoose";
import { Blog } from "../models/Blogmodel";  // adjust path if needed



// Get a blog by ID including comments, likes, shares
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid blog ID" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add comment to blog
export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { authorName, text } = req.body;
    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid blog ID" });
      return;
      }
    if (!authorName || !text) {
      res.status(400).json({ error: "authorName and text are required" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    // Initialize comments if not present
    if (!Array.isArray(blog.comments)) {
      blog.comments = [];
    }

    const newComment = {
      authorName,
      text,
      createdAt: new Date(),
    };

    blog.comments.unshift(newComment);

    await blog.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a like to blog
export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid blog ID" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    blog.likes = (blog.likes || 0) + 1;
    await blog.save();

    res.json({ likes: blog.likes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a share to blog
export const addShare = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid blog ID" });
      return;
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    blog.shares = (blog.shares || 0) + 1;
    await blog.save();

    res.json({ shares: blog.shares });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
