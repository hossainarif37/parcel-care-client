import { useSelector } from "react-redux";
import { IRootState } from "../../../types/types";
import { adminMenuLinks, agentMenuLinks, userMenuLinks } from "../../../constants/dashboardMenuLinks";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isNormalUser = user?.role === 'user';
    const isAgent = user?.role === 'agent';
    const isAdmin = user?.role === 'admin';
    const menuLinks = isNormalUser ? userMenuLinks :
        isAgent ? agentMenuLinks :
            isAdmin ? adminMenuLinks : [];

    return (
        <aside className="w-48 bg-secondary h-screen text-white">
            <ul>
                {menuLinks.map((category) => (
                    <li key={category.title} className='mb-4'>
                        <Link to={category.path}>
                            <span>{category.icon}</span>
                            <span>{category.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;