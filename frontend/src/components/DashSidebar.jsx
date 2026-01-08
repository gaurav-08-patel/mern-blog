import {
    ArrowRightIcon,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";

const DashSidebar = () => {
    return (
        <div className="md:h-full">
            <Sidebar className="w-full md:w-56 lg:w-70 ">
                <SidebarItems className="">
                    <SidebarItemGroup>
                        <Link to={"/dashboard?tab=profile"}>
                            <SidebarItem
                                icon={HiUser}
                                label="User"
                                labelColor="dark"
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
