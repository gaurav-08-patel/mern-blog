import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
    const [showMore, setShowMore] = useState(true);
    let { authUser } = useAuthContext();
    const [userPosts, setUserPosts] = useState({});

    async function handleShowMore() {
        let startIndex = userPosts.length;
        try {
            let res = await fetch(
                `/api/post/getposts?userId=${authUser._id}&startIndex=${startIndex}`
            );
            let data =await res.json();
            if (res.ok) {
                setUserPosts([...userPosts, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
                let res = await fetch(
                    `/api/post/getposts?userId=${authUser._id}`
                );
                let data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchPosts();
    }, [authUser._id]);

    return (
        <div className="p-2 table-auto  min-h-screen">
            {authUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="divide-y shadow rounded-2xl">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date Updated</TableHeadCell>
                                <TableHeadCell>post image</TableHeadCell>
                                <TableHeadCell>post title</TableHeadCell>
                                <TableHeadCell>category</TableHeadCell>
                                <TableHeadCell>delete</TableHeadCell>
                                <TableHeadCell>edit</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userPosts.map((post) => (
                                <TableRow>
                                    <TableCell>
                                        {new Date(
                                            post.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className=" h-12  object-cover w-16"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {post.title}
                                            </span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>
                                        <span className="text-red-500 hover:underline font-semibold cursor-pointer">
                                            Delete
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/updatepost/${post._id}`}>
                                            <span className="text-slate-500 font-semibold hover:underline">
                                                Edit
                                            </span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="text-teal-500 w-full cursor-pointer my-2"
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : (
                <p className="text-center my-3">You have no posts</p>
            )}
        </div>
    );
};

export default DashPosts;
