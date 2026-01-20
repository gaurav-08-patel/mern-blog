import mongoose from "mongoose";

let commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        postOwnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        likes: {
            type: Array,
            default: [],
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
