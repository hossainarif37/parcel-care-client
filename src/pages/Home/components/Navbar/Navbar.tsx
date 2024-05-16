import { Link } from "react-router-dom";
import { navLinks } from "../../../../constants/navLinks";
import ActiveLink from "./ActiveLink";
import UserImage from "../../../../components/UserImage";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../types/types";

const Navbar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    return (
        <div className="w-full absolute md:px-28 py-5 flex md:justify-between z-10 bg-transparent">
            {/* Logo */}
            <div>
                <Link to='/' className="text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
            </div>

            {/* NavLinks */}
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
                {/* User Dropdown */}
            </ul>
        </div>
    );
};

export default Navbar;