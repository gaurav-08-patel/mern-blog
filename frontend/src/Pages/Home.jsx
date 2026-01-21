import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        async function fetchRecentPost() {
            try {
                let res = await fetch(`/api/post/getposts?limit=9`);

                if (res.ok) {
                    let data = await res.json();
                    setRecentPosts(data.posts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchRecentPost();
    }, []);
    return (
        <div className="min-h-screen">
            <div className=" p-3  h-fit flex flex-col max-w-5xl  mx-auto">
                <h1 className="text-4xl mt-25 mb-6 font-bold sm:text-6xl">
                    Welcome to my Blog
                </h1>
                <p className="text-gray-500 font-medium text-xs sm:text-sm">
                    Welcome to my blog! Here you'll find a wide range of
                    articles, tutorials, and resources designed to help you grow
                    as a developer. Whether you're interested in web
                    development, software engineering, programming languages, or
                    best practices in the tech industry, there's something here
                    for everyone. Dive in and explore the content to expand your
                    knowledge and skills.
                </p>
                <span className="font-semibold text-teal-500 hover:underline mt-4">
                    <Link to={"/search"}>View all posts</Link>
                </span>
            </div>
            <div className="max-w-5xl  mx-auto mt-10 bg-amber-100 p-3 dark:bg-slate-800">
                <CallToAction />
            </div>

            <div className="mt-10 max-w-5xl  mx-auto flex flex-col mb-5 p-3">
                <h1 className="text-2xl text-center my-4 font-semibold">Recent Articles</h1>
                <div className="flex flex-wrap justify-center lg:justify-between md:bg-amber-100 gap-4">
                    {recentPosts &&
                        recentPosts.map((post) => (
                            <PostCard key={post._id} post={post} className="sm:w-full md:w-100"/>
                        ))}
                </div>
                <span className="font-semibold text-xl text-teal-500 hover:underline mt-4 text-center">
                    <Link to={"/search"}>View all posts</Link>
                </span>
            </div>
        </div>
    );
};

export default Home;
