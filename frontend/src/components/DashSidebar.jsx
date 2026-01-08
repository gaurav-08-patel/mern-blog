import {
    ArrowRightIcon,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";

const customTheme = {
    item: {
        active: "bg-gray-200 text-black",
    },
};

const DashSidebar = () => {
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
        <div className="md:h-full">
            <Sidebar className="w-full md:w-56 lg:w-70 " theme={customTheme}>
                <SidebarItems className="">
                    <SidebarItemGroup>
                        <Link to={"/dashboard?tab=profile"}>
                            <SidebarItem
                                icon={HiUser}
                                label="User"
                                labelColor="dark"
                                active={tab === "profile"}
                                as={'div'}
                            >
                                Profile
                            </SidebarItem>
                        </Link>
                    </SidebarItemGroup>
                    <SidebarItemGroup className="">
                        <SidebarItem icon={ArrowRightIcon}>
                            Sign out
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </div>
    );
};

export default DashSidebar;
