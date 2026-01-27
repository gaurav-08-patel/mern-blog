import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
    let [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    let navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        let urlParams = new URLSearchParams(location.search);
        let searchTermFromUrl = urlParams.get("searchTerm");
        let sortFromUrl = urlParams.get("order");
        let categoryFromUrl = urlParams.get("category");

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl || "desc",
                category: categoryFromUrl,
            });
        }

        async function fetchPosts() {
            let searchQuery = urlParams.toString();

            try {
                setLoading(true);
                let res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/post/getposts?${searchQuery}`,
                );

                if (res.ok) {
                    let data = await res.json();
                    setPosts(data.posts);

                    if (data.posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [location.search]);

    function handleChange(e) {
        if (e.target.id === "searchTerm") {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === "sort") {
            setSidebarData({ ...sidebarData, sort: e.target.value || "desc" });
        }
        if (e.target.id === "category") {
            setSidebarData({
                ...sidebarData,
                category: e.target.value || "uncategorized",
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        let urlParams = new URLSearchParams(location.search);
        if (sidebarData.searchTerm)
            urlParams.set("searchTerm", sidebarData.searchTerm);
        if (sidebarData.category && sidebarData.category !== "uncategorized")
            urlParams.set("category", sidebarData.category);
        if (sidebarData.sort) urlParams.set("order", sidebarData.sort);

        navigate(`/search?${urlParams.toString()}`);
    }

    async function handleShowMore() {
        let startIndex = posts.length;
        let urlParams = new URLSearchParams(location.search);

        try {
            let res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/post/getposts?${urlParams.toString()}&startIndex=${startIndex}`,
            );
            let data = await res.json();
            if (res.ok) {
                setPosts([...posts, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className=" p-6 border-b  border-b-gray-500 md:border-r md:border-r-gray-500">
                <form
                    onSubmit={handleSubmit}
                    className="md:min-h-screen flex flex-col gap-3"
                >
                    <div className="flex items-center gap-2">
                        <label
                            className="whitespace-nowrap font-semibold"
                            htmlFor="searchTerm"
                        >
                            Search Term:
                        </label>
                        <TextInput
                            type="text"
                            placeholder="Search..."
                            id="searchTerm"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="sort" className="font-semibold">
                            Sort :
                        </label>
                        <Select
                            className="w-40"
                            value={sidebarData.sort}
                            onChange={handleChange}
                            id="sort"
                        >
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="sort" className="font-semibold">
                            Category :
                        </label>
                        <Select
                            className="w-40"
                            value={sidebarData.category}
                            onChange={handleChange}
                            id="category"
                        >
                            <option value="uncategorized">
                                Select a category
                            </option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">React JS</option>
                            <option value="nodejs">Node JS</option>
                            <option value="nextjs">Next JS</option>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        className={`cursor-pointer bg-linear-to-r from-blue-500 to-green-500 hover:bg-linear-to-l focus:ring-purple-200 dark:focus:ring-purple-800  font-semibold`}
                    >
                        Apply filters
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <div className="p-5 border-b">
                    <h1 className="text-3xl font-semibold">Posts Results :</h1>
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-4 w-full p-6">
                        {loading ? (
                            <p className="text-xl p-3">Loading...</p>
                        ) : posts.length === 0 ? (
                            <p className="text-xl p-3">No Posts found</p>
                        ) : (
                            posts.map((post) => {
                                return (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        className="w-full  mx-auto md:w-75 lg:w-auto "
                                    />
                                );
                            })
                        )}
                    </div>

                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="text-teal-500 w-full cursor-pointer my-2"
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
