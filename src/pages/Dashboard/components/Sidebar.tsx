import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../types/types";
import { adminMenuLinks, agentMenuLinks, userMenuLinks } from "../../../constants/dashboardMenuLinks";
import { Link, useLocation } from "react-router-dom";
import UserImage from "../../../components/UserImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoutButton from "../../../components/Buttons/LogoutButton";
import { toggleDashboard } from "../../../redux/slices/navbar/navbarSlice";
import Logo from "@/components/layouts/Navbar/Logo";

const Sidebar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();
    const isNormalUser = user?.role === 'user';
    const isAgent = user?.role === 'agent';
    const isAdmin = user?.role === 'admin';
    const menuLinks = isNormalUser ? userMenuLinks :
        isAgent ? agentMenuLinks :
            isAdmin ? adminMenuLinks : [];

    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            {/* Logo */}
            <div className="flex justify-between items-center gap-x-2">
                <Logo />

                {/* Dashboard Toggle Close Button */}
                <button type="button" className="block md:hidden text-2xl" onClick={() => dispatch(toggleDashboard(false))}>
                    <Icon icon="material-symbols:close" />
                </button>
            </div>

            <hr className="my-5" />

            {/* Dashboard Sidebar Menu Links */}
            <ul className="flex flex-col gap-y-1 xl:gap-y-2">
                {menuLinks.map((category) => (
                    <li
                        className={`${user?.role === 'agent' && user?.agentRequestStatus !== 'accepted' && category.title !== 'Profile' && 'hidden '}`}
                        key={category.title}>
                        <Link to={category.path} className={`flex p-2 xl:p-3 rounded-lg gap-x-2 items-center text-xs xl:text-base ${category.path === path && 'gradient text-white'}`}>
                            <span className={`text-2xl ${(category.title === 'Pending Agents' || category.title === 'Transactions') && category.path !== path && 'text-black-100'}`}>
                                <Icon icon={category.icon} />
                            </span>
                            <span>{category.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <hr className="py-2 xl:py-3" />
                <div className="flex gap-x-4 items-center mb-5">
                    <UserImage className="w-8 h-8 xl:w-10 xl:h-10" profilePicture={user?.profilePicture} />
                    <div className="text-black-50">
                        <p className="text-secondary text-sm xl:text-base font-semibold">{user?.name}</p>
                        <p className="font-semibold text-xs xl:text-sm">{user?.role} {user?.role === 'agent' && user?.agentRequestStatus !== 'accepted' && <span className="error">({user?.agentRequestStatus})</span>}</p>
                    </div>
                </div>

                <LogoutButton className="border rounded-full shadow-md" />
            </div>
        </>
    );
};

export default Sidebar;