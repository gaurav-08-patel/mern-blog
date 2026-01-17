import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import { createComment, getComments } from "../controllers/comment.controller.js";

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);

export default router;
