import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../../../constants/navLinks";
import ActiveLink from "./ActiveLink";
import UserImage from "../../../../components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../types/types";
import OpenMenuButton from "../../../../components/Buttons/OpenMenuButton";
import CloseMenuButton from "../../../../components/Buttons/CloseMenuButton";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react/dist/iconify.js";
import { removeUser } from "../../../../redux/slices/user/userSlice";

const Navbar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { isNavToggle } = useSelector((state: IRootState) => state.navbarSlice);
    const dispatch = useDispatch();

    const location = useLocation();
    const isDashboardPage = location.pathname.includes('/dashboard');


    return (
        <div className={`w-full ${isDashboardPage && 'hidden'} absolute px-5 md:px-28 py-5 flex justify-between items-center z-10 bg-transparent`}>
            {/* Logo */}
            <div>
                <Link to='/' className="text-3xl md:text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
            </div>

            {/* Desktop */}
            <ul className="md:text-white hidden  font-semibold md:flex justify-center items-center gap-x-10">
                {
                    navLinks?.map((link, i) => (
                        <ActiveLink
                            key={i}
                            path={link.path}
                            title={link.title}
                        />
                    ))
                }

                {
                    user ?
                        <UserImage customWidth="w-10" isProfileDropdownBtn={true} /> :
                        <li >
                            <Link
                                className={`'bg-gray-200 rounded py-2 block w-full'}`} to='/login'>
                                Login
                            </Link>
                        </li>
                }
            </ul>

            {/* Mobile */}
            <div className="block lg:hidden">

                {/* Navbar Menu Button */}
                {!isNavToggle && <OpenMenuButton />}

                {/* Navbar Close Button */}
                <ul className={`shadow-xl bg-white absolute text-center border-t rounded-md w-full flex flex-col gap-y-3 p-5 duration-300 h-screen top-0 right-0 origin-right ${isNavToggle ? 'scale-x-100' : 'scale-x-0'}`}>

                    {/* Navbar Menu Button */}
                    <div className="w-full text-right">
                        <CloseMenuButton />
                    </div>

                    <hr />

                    {/* Navlinks */}
                    {
                        navLinks?.map((link, i) => (
                            <ActiveLink
                                key={i}
                                path={link.path}
                                title={link.title}
                            />
                        ))
                    }

                    {
                        user ?

                            <button
                                type="button"
                                title="Logout"
                                className="btn flex w-full items-center justify-center gap-2"
                                onClick={() => {
                                    Cookies.remove('authToken');
                                    dispatch(removeUser());
                                }}

                            >
                                <Icon icon="material-symbols:logout" />
                                <span>Logout</span>
                            </button> :
                            <Link to='/login'>Login</Link>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;