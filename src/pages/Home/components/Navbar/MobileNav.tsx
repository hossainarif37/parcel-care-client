import { Link } from "react-router-dom";
import { IRootState } from "../../../../types/types";
import { useSelector } from "react-redux";
import OpenMenuButton from "../../../../components/Buttons/OpenMenuButton";
import CloseMenuButton from "../../../../components/Buttons/CloseMenuButton";
import { navLinks } from "../../../../constants/navLinks";
import ActiveLink from "./ActiveLink";
import LogoutButton from "@/components/Buttons/LogoutButton";

const MobileNav = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { isNavToggle } = useSelector((state: IRootState) => state.navbarSlice);
    const isAgentUser = user?.role === 'agent';
    const isAdminUser = user?.role === 'admin';
    const isNormalUser = user?.role === 'user';
    return (
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

                        <>
                            <Link to={
                                `/dashboard${isNormalUser && '/user/my-parcels' || isAdminUser && '/admin/overview' || isAgentUser && '/agent/delivery-list'}`
                            }>
                                Dashboard
                            </Link>
                            {/* Logout */}
                            <LogoutButton className="border rounded-full shadow-md"/>
                        </> :
                        <Link to='/login'>Login</Link>
                }
            </ul>
        </div>
    );
};

export default MobileNav;