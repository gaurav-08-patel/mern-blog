import {
    Footer,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComp = () => {
    return (
        <Footer className="border border-t-5 border-teal-400 flex flex-col  md:items-start   ">
            <div className="p-5">
                <Link className="md:text-xl whitespace-nowrap dark:text-white font-bold">
                    <span className="px-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white py-1">
                        Gaurav's
                    </span>
                    Blog
                </Link>
            </div>
            <div className="md:flex justify-between w-full">
                <div className="p-2">
                    <FooterTitle title="About" />
                    <FooterLinkGroup className="flex flex-col gap-2">
                        <FooterLink
                            href="https://gauravs-portfolio-g.vercel.app/"
                            target="_blank"
                        >
                            My Portfolio
                        </FooterLink>
                        <FooterLink href="#">Gaurav's Blog</FooterLink>
                    </FooterLinkGroup>
                </div>
                <div className="flex justify-between p-2">
                    <div className="p-1">
                        <FooterTitle title="Legal" />
                        <FooterLinkGroup className="flex flex-col gap-2">
                            <FooterLink href="#">Privacy policy</FooterLink>
                            <FooterLink href="#">
                                Terms &amp; condition{" "}
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div className="p-1">
                        <FooterTitle title="follow us" />
                        <FooterLinkGroup className="flex flex-col gap-2">
                            <FooterLink
                                href="https://github.com/gaurav-08-patel"
                                target="_blank"
                            >
                                Github
                            </FooterLink>
                            <FooterLink href="#">Discord</FooterLink>
                        </FooterLinkGroup>
                    </div>
                </div>
            </div>
            <FooterDivider />
            <div className="md:flex justify-between  w-full items-center md:p-1">
                <FooterCopyright
                    by="Gaurav's Blog"
                    year={new Date().getFullYear()}
                />
                <div className="flex gap-4 my-2">
                    <FooterIcon href="#" icon={BsFacebook} />
                    <FooterIcon href="#" icon={BsInstagram} />
                    <FooterIcon href="#" icon={BsTwitter} />
                    <FooterIcon href="#" icon={BsGithub} />
                </div>
            </div>
        </Footer>
    );
};

export default FooterComp;
