import Post from "../models/post.model.js";

export const create = async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json({
            message: "You are not allowed to create post.",
        });
    }

    if (!req.body.title || !req.body.content) {
        res.status(400).json({ message: "All fields are required." });
    }

    let slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        let savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error: "Duplicate Key" });
    }
};

export const getPosts = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.startIndex) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: "i" } },
                    {
                        content: {
                            $regex: req.query.searchTerm,
                            $options: "i",
                        },
                    },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({ posts, totalPosts, lastMonthPosts });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePost = async (req, res) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        res.status(403).json("You are not allowed to delete this post.");
    }

    try {
        await Post.findByIdAndDelete({ _id: req.params.postId });

        res.status(200).json("Post deleted successfully.");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const updatePost = async (req, res) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        res.status(403).json("You are not allowed to update this post.");
    }

    try {
        let filteredData = {};

        if (req.body.title) filteredData.title = req.body.title;
        if (req.body.category) filteredData.category = req.body.category;
        if (req.body.content) filteredData.content = req.body.content;
        if (req.body.image) filteredData.image = req.body.image;

        let updatedUser = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: filteredData,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
