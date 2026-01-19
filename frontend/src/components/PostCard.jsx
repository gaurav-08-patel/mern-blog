import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div className="sm:w-105 w-full  group my-3 border border-teal-500 hover:border-2 transition-all duration-300 relative overflow-hidden rounded-xl">
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt="post cover"
                    className="w-full h-60 group-hover:h-50 object-cover transition-all duration-300"
                />
            </Link>
            <div className="p-2 flex flex-col gap-2 group-hover:pb-10 transition-all duration-300">
                <h1 className="font-semibold text-xl line-clamp-2">
                    {post.title}
                </h1>
                <p className="text-sm italic mb-1">{post.category}</p>
                <Link
                    to={`/post/${post.slug}`}
                    className="p-1 text-center absolute group-hover:bottom-0 left-0 right-0 -bottom-20 m-1 transition-all duration-300 rounded-bl-xl rounded-br-xl bg-teal-400 text-white"
                >
                    Read article
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
