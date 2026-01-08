import { useEffect, useState } from "react";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    console.log(location);
    let [tab, setTab] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlTab = params.get("tab");
        if (urlTab) {
            setTab(urlTab);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <div>
                <DashSidebar />
            </div>
            {/* Profile.... */}
            <div className="w-full">{tab === "profile" && <DashProfile />}</div>
        </div>
    );
};

export default Dashboard;
