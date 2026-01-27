import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbMessage2Filled } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";

const DashboardComponet = () => {
    let { authUser } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);

    useEffect(() => {
        async function fetchUsers() {
            try {
                let res = await fetch(
                    `mern-blog-production-674c.up.railway.app/api/user/getusers?limit=5`,
                );

                if (res.ok) {
                    let data = await res.json();
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchPosts() {
            try {
                let res = await fetch(
                    `mern-blog-production-674c.up.railway.app/api/post/getposts?userId=${authUser._id}&limit=5`,
                );

                if (res.ok) {
                    let data = await res.json();
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchComments() {
            try {
                let res = await fetch(
                    `mern-blog-production-674c.up.railway.app/api/comment/getComments?limit=5`,
                );

                if (res.ok) {
                    let data = await res.json();
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (authUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [authUser]);

    return (
        <div className="p-3">
            <div className="flex flex-wrap gap-3 justify-center">
                {/* Cards */}
                <div className="p-3 w-full lg:w-90 shadow-md rounded-lg gap-4 flex flex-col dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl text-gray-500 uppercase">
                                Total users
                            </h1>
                            <span className="text-3xl font-semibold">
                                {totalUsers}
                            </span>
                        </div>
                        <div className="p-4 rounded-full bg-teal-500 text-white text-3xl">
                            <HiOutlineUserGroup />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center text-green-500 gap-1">
                            <FaArrowUp />
                            {lastMonthUsers}
                        </span>
                        <span className="text-gray-500">Last Month</span>
                    </div>
                </div>
                <div className="p-3 w-full lg:w-90 shadow-md rounded-lg gap-4 flex flex-col dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl text-gray-500 uppercase">
                                Total posts
                            </h1>
                            <span className="text-3xl font-semibold">
                                {totalPosts}
                            </span>
                        </div>
                        <div className="p-4 rounded-full bg-blue-500 text-white text-3xl">
                            <TbMessage2Filled />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center text-green-500 gap-1">
                            <FaArrowUp />
                            {lastMonthPosts}
                        </span>
                        <span className="text-gray-500">Last Month</span>
                    </div>
                </div>
                <div className="p-3 w-full lg:w-90 shadow-md rounded-lg gap-4 flex flex-col dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl text-gray-500 uppercase">
                                Total comments
                            </h1>
                            <span className="text-3xl font-semibold">
                                {totalComments}
                            </span>
                        </div>
                        <div className="p-4 rounded-full bg-green-500 text-white text-3xl">
                            <IoDocumentText />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="flex items-center text-green-500 gap-1">
                            <FaArrowUp />
                            {lastMonthComments}
                        </span>
                        <span className="text-gray-500">Last Month</span>
                    </div>
                </div>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
                {/* tables */}
                <div className="max-w-130 flex-1 p-3 shadow-md rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Recent Users</h1>
                        <Link to={"/dashboard?tab=users"}>
                            <Button className="cursor-pointer text-white font-semibold bg-linear-to-br from-green-400 to-blue-600hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                                See all
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Table
                            hoverable
                            className="divide-y rounded-2xl dark:bg-slate-700 overflow-hidden"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="whitespace-nowrap">
                                        User image
                                    </TableHeadCell>
                                    <TableHeadCell className="whitespace-nowrap">
                                        Username
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow>
                                        <TableCell>
                                            <img
                                                src={user.profilePicture}
                                                alt={"avatar"}
                                                className=" h-12  object-cover w-12 rounded-full bg-teal-100 overflow-hidden"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {user.username}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="max-w-130 flex-1 p-3 shadow-md rounded-2xl flex flex-col gap-3 ">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">
                            Recent Comments
                        </h1>
                        <Link to={"/dashboard?tab=comments"}>
                            <Button className="cursor-pointer text-white font-semibold bg-linear-to-br from-green-400 to-blue-600hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                                See all
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Table
                            hoverable
                            className="divide-y rounded-2xl dark:bg-slate-700 overflow-hidden"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="whitespace-nowrap">
                                        Comment content
                                    </TableHeadCell>
                                    <TableHeadCell className="whitespace-nowrap">
                                        likes
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {comments.map((comment) => (
                                    <TableRow>
                                        <TableCell className="line-clamp-2 w-96">
                                            {comment.content}
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {comment.numberOfLikes}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="flex-1 max-w-130 p-3 shadow-md rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Recent Posts</h1>
                        <Link to={"/dashboard?tab=posts"}>
                            <Button className="cursor-pointer text-white font-semibold bg-linear-to-br from-green-400 to-blue-600hover:bg-linear-to-bl focus:ring-green-200 dark:focus:ring-green-800">
                                See all
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Table
                            hoverable
                            className="divide-y rounded-2xl dark:bg-slate-700 overflow-hidden"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="whitespace-nowrap">
                                        Post image
                                    </TableHeadCell>
                                    <TableHeadCell className="whitespace-nowrap">
                                        post title
                                    </TableHeadCell>
                                    <TableHeadCell>category</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponet;
