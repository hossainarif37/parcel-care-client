import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../../../constants/navLinks";
import ActiveLink from "./ActiveLink";
import UserImage from "../../../../components/UserImage";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../types/types";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import useWindowScroll from "@/hooks/useWindowScroll";

const Navbar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const location = useLocation();

    const isDashboardPage = location.pathname.includes('/dashboard');
    const isScrolled = useWindowScroll(50);


    return (
        <div className={`w-full duration-300 ${isScrolled && 'bg-white/70 backdrop-blur'} ${isDashboardPage && 'hidden'} sticky top-0 px-5 md:px-28 py-3 xl:py-5 flex justify-between items-center z-10 bg-transparent`}>
            {/* Logo */}
            <Logo />

            {/* Desktop */}
            <ul className={`${isScrolled ? 'text-black-100' : 'text-white'} hidden font-semibold md:flex justify-center items-center text-sm xl:text-base gap-x-10`}>
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
                        <UserImage customSize="w-10 h-10" isProfileDropdownBtn={true} profilePicture={user?.profilePicture} /> :
                        <li >
                            <Link
                                className={`'bg-gray-200 rounded py-2 block w-full'}`} to='/login'>
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