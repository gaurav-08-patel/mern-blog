import {
    Button,
    Navbar,
    NavbarCollapse,
    NavbarLink,
    TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";

const Header = () => {
    return (
        <Navbar className="border-b-2 ">
            <Link className="whitespace-nowrap dark:text-white font-bold">
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
                <Link to="/signin">
                    <Button className="bg-linear-to-r from-purple-500 to-blue-500">
                        Sign In
                    </Button>
                </Link>

                <Button
                    className="bg-white text-gray border cursor-pointer hover:bg-white"
                    pill
                >
                    <FaMoon />
                </Button>
            </div>
            <NavbarCollapse>
                <NavbarLink active>
                    <Link to="/">Home</Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/about">About</Link>
                </NavbarLink>
                <NavbarLink>
                    <Link to="/projects">Projects</Link>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
};

export default Header;
