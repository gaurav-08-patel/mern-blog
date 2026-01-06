import {
    Avatar,
    Button,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
    const { authUser } = useAuthContext();

    const path = useLocation().pathname;
    return (
        <Navbar className="border-b-2 ">
            <Link className="md:text-xl whitespace-nowrap dark:text-white font-bold">
                <span className="px-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white py-1">
                    Gaurav's
                </span>
                Blog
            </Link>
            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={FaSearch}
                    className="hidden md:inline "
                />
                <Button
                    className="border bg-gray text-black hover:bg-white cursor-pointer md:hidden"
                    pill
                >
                    <FaSearch />
                </Button>
            </form>

            <div className="flex gap-1 md:order-2">
                <Button
                    className="bg-white text-gray border cursor-pointer hover:bg-white"
                    pill
                >
                    <FaMoon />
                </Button>
                {authUser ? (
                    <Dropdown
                        className="cursor-pointer"
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                rounded
                                img={authUser.profilePicture}
                            ></Avatar>
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">
                                @{authUser.username}
                            </span>
                            <span className="font-semibold text-sm truncate">
                                {authUser.email}
                            </span>
                        </DropdownHeader>
                        <Link to={"/dashboard?tab=profile"}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                ) : (
                    <Link to="/signin">
                        <Button className="cursor-pointer bg-linear-to-r from-purple-500 to-blue-500">
                            Sign In
                        </Button>
                    </Link>
                )}

                <NavbarToggle className="border">
                    <RxHamburgerMenu />
                </NavbarToggle>
            </div>
            <NavbarCollapse>
                <Link to="/" className="w-full font-bold lg:text-[17px]">
                    <NavbarLink active={path === "/"} as={"div"}>
                        Home
                    </NavbarLink>
                </Link>
                <Link to="/about" className="w-full font-bold lg:text-[17px]">
                    <NavbarLink active={path === "/about"} as={"div"}>
                        About
                    </NavbarLink>
                </Link>
                <Link
                    to="/projects"
                    className="w-full font-bold lg:text-[17px]"
                >
                    <NavbarLink active={path === "/projects"} as={"div"}>
                        Projects
                    </NavbarLink>
                </Link>
            </NavbarCollapse>
        </Navbar>
    );
};

export default Header;
