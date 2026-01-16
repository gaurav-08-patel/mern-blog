import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
    let { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState({});

    useEffect(() => {
        async function fetchPost() {
            try {
                setLoading(true);
                let res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                let data = await res.json();

                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setPost(data.posts[0]);
                setLoading(false);

                if(!data.posts[0]){
                    setError(true)
                }

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    }, [postSlug]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );

    if (error)
        return (
            <p className="text-center my-3 min-h-screen">
                Error while getting post or post may not exist.
            </p>
        );
    return (
        <main className="min-h-screen max-w-4xl mx-auto p-3 flex flex-col">
            <h1 className="font-semibold text-4xl lg:text-5xl text-center my-6">
                {post?.title}
            </h1>

            <button className="text-[10px] p-1 border border-gray-500 rounded-2xl px-1 w-fit mx-auto ">
                <Link
                    className="hover:underline"
                    to={`/search?category=${post.category}`}
                >
                    {post?.category}
                </Link>
            </button>

            <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover p-2 mt-8"
            />

            <div className="flex justify-between max-w-2xl w-full mx-auto border-b-2 border-slate-500 p-2 mb-5 text-sm ">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">
                    {(post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="p-3 w-full max-w-2xl mx-auto post-content"
            ></div>
            <div className="max-w-4xl ">
                <CallToAction />
            </div>
            <CommentSection postId={post._id} />
        </main>
    );
};

export default PostPage;
