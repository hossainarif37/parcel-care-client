import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../types/types";
import { adminMenuLinks, agentMenuLinks, userMenuLinks } from "../../../constants/dashboardMenuLinks";
import { Link, useLocation } from "react-router-dom";
import UserImage from "../../../components/UserImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoutButton from "../../../components/Buttons/LogoutButton";
import { toggleDashboard } from "../../../redux/slices/navbar/navbarSlice";
import Logo from "../../Home/components/Navbar/Logo";

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
        <aside className="fixed h-full md:sticky inset-y-0 left-0 md:min-w-72 flex flex-col md:h-screen border-r py-5 px-7 bg-white border-white-100">
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
            <ul className="flex flex-col gap-y-2">
                {menuLinks.map((category) => (
                    <li key={category.title} >
                        <Link to={category.path} className={`flex p-3 rounded-lg gap-x-2 items-center ${category.path === path && 'gradient text-white'}`}>
                            <span className="text-2xl"><Icon icon={category.icon} /></span>
                            <span>{category.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <hr className="py-3" />
                <div className="flex gap-x-4 items-center mb-5">
                    <UserImage customWidth="w-10" />
                    <div className="text-black-50">
                        <p className="text-secondary font-semibold">{user?.name}</p>
                        <p className="font-semibold text-sm">{user?.role}</p>
                    </div>
                </div>

                <LogoutButton className="logoutButton" />
            </div>
        </aside>
    );
};

export default Sidebar;