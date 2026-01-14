import express from "express";
import { create, deletePost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

export default router