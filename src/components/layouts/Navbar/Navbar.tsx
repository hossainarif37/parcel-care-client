import { Link, useLocation } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import useWindowScroll from "@/hooks/useWindowScroll";
import UserMenuDropdown from "./UserMenuDropDown/UserMenuDropdown";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { IRootState } from "@/types/types";
import { navLinks } from "@/constants/navLinks";
import UserImage from "@/components/UserImage";

const Navbar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const location = useLocation();
    const [isDropdown, setIsDropdown] = useState(false);
    const isDashboardPage = location.pathname.includes('/dashboard');
    const isScrolled = useWindowScroll(50);
    const dropdownRef = useOutsideClick(isDropdown, setIsDropdown);

    return (
        <div className={`w-full duration-300 ${isScrolled && 'bg-white/80 backdrop-blur'} ${isDashboardPage && 'hidden'} sticky top-0 px-5 md:px-28 py-3 xl:py-5 flex justify-between items-center z-10 bg-transparent`}>
            {/* Logo */}
            <Logo />

            {/* Desktop */}
            <ul className={`${isScrolled ? 'text-black-100' : 'text-white'} hidden font-semibold md:flex justify-center items-center text-sm xl:text-base gap-x-8 xl:gap-x-12`}>
                {
                    navLinks?.map((link, i) => (
                        <ActiveLink
                            key={i}
                            path={link.path}
                            title={link.title}
                        />
                    ))
                }

                {/* Conditionally render the "Become an Agent" link only if the user is not an agent */}
                {(!user) && (
                    <ActiveLink
                        path='#'
                        title="Become an agent"
                    />
                )}

                {
                    user ?
                        <div
                            onClick={() => setIsDropdown(!isDropdown)}
                            className="relative cursor-pointer group"
                            title="Profile"
                            ref={dropdownRef}
                        >
                            <UserImage className="w-8 h-8 xl:w-10 xl:h-10" profilePicture={user?.profilePicture} />
                            <UserMenuDropdown className={`origin-top duration-200 ${isDropdown ? 'scale-y-100' : 'scale-y-0'}`} />
                        </div>
                        :
                        <li >
                            <Link
                                className="md:text-xs md:font-medium xl:text-base"
                                to='/login'>
                                Login
                            </Link>
                        </li>

                }
            </ul>

            {/* Mobile */}
            <MobileNav />

        </div>
    );
};

export default Navbar;