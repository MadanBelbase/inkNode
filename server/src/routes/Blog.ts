import express from "express";
import { getBlogById, addComment, addLike, addShare } from "../controller/blogController";
import {verifyToken } from "../middlewares/authenticateToken"

const blogrouter = express.Router(); // Make sure this is a Router instance!

// Correctly register route handlers
blogrouter.get("/getblogs/:id", getBlogById);
blogrouter.post("/getblogs/comment/:id", verifyToken , addComment);
blogrouter.post("/getblogs/like/:id", verifyToken ,addLike);
blogrouter.post("/getblogs/share/:id", verifyToken ,addShare);

export default blogrouter;

