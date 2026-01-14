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
    let { authUser } = useAuthContext();
    const [userPosts, setUserPosts] = useState({});

    console.log("userpost", userPosts);

    useEffect(() => {
        async function fetchPosts() {
            try {
                let res = await fetch(
                    `/api/post/getposts?userId=${authUser._id}`
                );
                let data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
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
                    <Table hoverable>
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
                                                className=" h-10  object-cover"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold text-gray-800 dark:text-white">
                                            aytwfdyawdfyag awy a GAuw sbjdv h
                                            ajeyfg hjsjrgfygusyrsy suy{" "}
                                            {post.title}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>Delete</TableCell>
                                    <TableCell>
                                        <Link to={`/edit/${post._id}`}>
                                            Edit
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            ) : (
                <p className="text-center my-3">You have no posts</p>
            )}
        </div>
    );
};

export default DashPosts;
