import { useSelector } from "react-redux";
import { IRootState } from "../../../types/types";
import { adminMenuLinks, agentMenuLinks, userMenuLinks } from "../../../constants/dashboardMenuLinks";
import { Link, useLocation } from "react-router-dom";
import UserImage from "../../../components/UserImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoutButton from "../../../components/Buttons/LogoutButton";

const Sidebar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isNormalUser = user?.role === 'user';
    const isAgent = user?.role === 'agent';
    const isAdmin = user?.role === 'admin';
    const menuLinks = isNormalUser ? userMenuLinks :
        isAgent ? agentMenuLinks :
            isAdmin ? adminMenuLinks : [];

    const location = useLocation();
    const path = location.pathname;

    return (
        <aside className="fixed inset-y-0 right-0 md:left-0  max-w-72 min-w-72 flex flex-col w-full h-screen overflow-hidden border-r py-5 px-7 bg-white border-white-100">
            {/* Logo */}
            <div>
                <Link to='/' className="text-3xl md:text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
            </div>

            <hr className="my-5" />

            <ul className="flex flex-col gap-y-3">
                {menuLinks.map((category) => (
                    <li key={category.title} >
                        <Link to={category.path} className={`flex p-2 rounded-lg gap-x-2 items-center ${category.path === path && 'bg-white-50'}`}>
                            <span><Icon icon={category.icon} /></span>
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
                        <p className="text-secondary">{user?.name}</p>
                        <p className="font-semibold text-xs">{user?.role}</p>
                    </div>
                </div>

                <LogoutButton className="logoutButton" />
            </div>
        </aside>
    );
};

export default Sidebar;