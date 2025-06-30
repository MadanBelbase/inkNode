import mongoose, { Document, Schema, Types } from "mongoose";

// Interface - extend to include comments, likes, shares
export interface IBlog extends Document {
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  status: "draft" | "published";
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
  author: Types.ObjectId;

  comments: {
    authorName: string;
    text: string;
    createdAt: Date;
  }[];

  likes: number;
  shares: number;
}

// Schema
const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featuredImage: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Add comments array
    comments: [
      {
        authorName: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Likes and shares count
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
