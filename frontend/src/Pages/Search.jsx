import { Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    console.log(sidebarData);

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
                let res = await fetch(`/api/post/getposts?${searchQuery}`);

                if (res.ok) {
                    let data = await res.json();
                    setPosts(data.posts);

                    if (posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(true);
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

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className=" p-6 border-b-2  border-b-gray-500 md:border-r-2 md:border-r-gray-500">
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
                </form>
            </div>
        </div>
    );
};

export default Search;
