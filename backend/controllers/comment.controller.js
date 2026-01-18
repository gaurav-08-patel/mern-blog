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

        let populatedComment = await Comment.findById(newComment._id).populate(
            "userId",
            "_id username email profilePicture",
        );

        res.status(200).json(populatedComment);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getComments = async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.postId })
            .sort({ createdAt: -1 })
            .populate("userId", "_id username email profilePicture");

        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const likeComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            res.status(404).json("Comment not found.");
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const editComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            res.status(404).json("Comment not found.");
        }

        if (req.user.id !== comment.userId && !req.user.isAdmin) {
            return res
                .status(403)
                .json("You are not authorized to edit this comment.");
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true },
        );
        res.status(200).json(editedComment);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            res.status(404).json("Comment not found.");
        }

        if (req.user.id !== comment.userId && !req.user.isAdmin) {
            return res
                .status(403)
                .json("You are not authorized to delete this comment.");
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json("Comment has been deleted");
    } catch (error) {
        res.status(400).json(error.message);
    }
};
