import { useEffect, useState } from "react";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router-dom";
import DashPosts from "../components/DashPosts";

const Dashboard = () => {
    const location = useLocation();
    let [tab, setTab] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlTab = params.get("tab");
        if (urlTab) {
            setTab(urlTab);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row ">
            {/* Sidebar */}
            <div>
                <DashSidebar />
            </div>
            {/* Profile.... */}
            <div className="w-full overflow-x-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-slate-500">
                {tab === "profile" && <DashProfile />}
                {tab === "posts" && <DashPosts />}
            </div>
        </div>
    );
};

export default Dashboard;
