import {
    ArrowRightIcon,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
    HiAnnotation,
    HiDocumentText,
    HiOutlineUserGroup,
    HiUser,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const customTheme = {
    item: {
        active: "bg-gray-200 text-black",
    },
};

const DashSidebar = () => {
    let { deleteAuthUser, authUser } = useAuthContext();
    const location = useLocation();
    let [tab, setTab] = useState("");

    function handleSignOut() {
        deleteAuthUser();
    }

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
                    <SidebarItemGroup className="flex flex-col ">
                        <Link to={"/dashboard?tab=profile"}>
                            <SidebarItem
                                icon={HiUser}
                                label={authUser.isAdmin ? "Admin" : "User"}
                                labelColor="dark"
                                active={tab === "profile"}
                                as={"div"}
                            >
                                Profile
                            </SidebarItem>
                        </Link>
                        {authUser.isAdmin && (
                            <Link to={"/dashboard?tab=users"}>
                                <SidebarItem
                                    icon={HiOutlineUserGroup}
                                    labelColor="dark"
                                    active={tab === "users"}
                                    as={"div"}
                                >
                                    Users
                                </SidebarItem>
                            </Link>
                        )}
                        {authUser.isAdmin && (
                            <Link to={"/dashboard?tab=posts"}>
                                <SidebarItem
                                    icon={HiDocumentText}
                                    labelColor="dark"
                                    active={tab === "posts"}
                                    as={"div"}
                                >
                                    Posts
                                </SidebarItem>
                            </Link>
                        )}
                        {authUser.isAdmin && (
                            <Link to={"/dashboard?tab=comments"}>
                                <SidebarItem
                                    icon={HiAnnotation}
                                    labelColor="dark"
                                    active={tab === "comments"}
                                    as={"div"}
                                >
                                    Comments
                                </SidebarItem>
                            </Link>
                        )}
                    </SidebarItemGroup>
                    <SidebarItemGroup className="">
                        <SidebarItem
                            icon={ArrowRightIcon}
                            onClick={() => handleSignOut()}
                            className="cursor-pointer"
                        >
                            Sign out
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </div>
    );
};

export default DashSidebar;
