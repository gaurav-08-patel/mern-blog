import Comment from "../models/comment.model";

export const createComment = async (req, res) => {
    let { content, userId, postId } = req.body;

    if (req.user.id !== req.userId) {
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
