import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import {
    createComment,
    deleteComment,
    editComment,
    getComments,
    getPostComments,
    likeComment,
} from "../controllers/comment.controller.js";

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getComments", verifyToken, getComments);

export default router;
