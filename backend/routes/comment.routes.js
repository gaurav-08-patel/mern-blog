import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import {
    createComment,
    editComment,
    getComments,
    likeComment,
} from "../controllers/comment.controller.js";

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);

export default router;
