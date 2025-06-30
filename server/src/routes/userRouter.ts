import { Router } from 'express';
import { createBlog,GetBlog ,GetBlogById ,getUserBlogs} from '../controller/userController';
import multer from 'multer';
import { upload } from '../middlewares/multer';
import {verifyToken } from "../middlewares/authenticateToken"


const userRouter = Router();

// POST /create-blog
userRouter.post('/create-blog',verifyToken , upload.single("image"),createBlog);
userRouter.get('/getblogs', GetBlog);
userRouter.get('/getblogs/:id', GetBlogById);
userRouter.get("/getblogs/:userId", verifyToken, getUserBlogs);

export default userRouter;

