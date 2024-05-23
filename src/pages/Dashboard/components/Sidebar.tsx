import { useSelector } from "react-redux";
import { IRootState } from "../../../types/types";
import { adminMenuLinks, agentMenuLinks, userMenuLinks } from "../../../constants/dashboardMenuLinks";
import { Link } from "react-router-dom";
import UserImage from "../../../components/UserImage";

const Sidebar = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isNormalUser = user?.role === 'user';
    const isAgent = user?.role === 'agent';
    const isAdmin = user?.role === 'admin';
    const menuLinks = isNormalUser ? userMenuLinks :
        isAgent ? agentMenuLinks :
            isAdmin ? adminMenuLinks : [];

    return (
        <aside className="w-72 h-screen border border-r p-5 border-white-100">
            {/* Logo */}
            <div>
                <Link to='/' className="text-3xl md:text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
            </div>

            <div className="flex gap-x-4 items-center my-5">
                <UserImage customWidth="w-10" />
                <div className="text-black-50">
                    <p className="font-semibold">{user?.name}</p>
                    <p>{user?.role}</p>
                </div>
            </div>
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