import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    let { content, userId, postId } = req.body;

    if (req.user.id !== userId) {
        res.status(403).json({
            error: "You are not allowed to create comment.",
        });
    }

    try {
        let newComment = new Comment({
            content,
            userId,
            postId,
        });

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getComments = async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.postId })
            .sort({ createdAt: -1 })
            .populate("userId" , "_id username email profilePicture");

        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
