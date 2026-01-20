import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res) => {
    let { content, userId, postId } = req.body;

    if (req.user.id !== userId) {
        res.status(403).json({
            error: "You are not allowed to create comment.",
        });
    }

    try {
        const post = await Post.findById(postId);
        const postOwnerId = post.userId;

        let newComment = new Comment({
            content,
            userId,
            postId,
            postOwnerId,
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

export const getPostComments = async (req, res) => {
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

export const getComments = async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json("You are not authorized to get comments");
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    try {
        let comments = await Comment.find({ postOwnerId: req.user.id })
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalComments = await Comment.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );

        const lastMonthComments = await Comment.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        res.status(500).json(error);
    }
};
