import userDropdownStyles from "./userMenuDropdown.module.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils";
import { IRootState } from "@/types/types";
import LogoutButton from "@/components/Buttons/LogoutButton";

const UserMenuDropdown = ({ className }: { className?: string }) => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isAgentUser = user?.role === 'agent';
    const isAdminUser = user?.role === 'admin';
    const isNormalUser = user?.role === 'user';

    return (
        <ul className={cn(`${userDropdownStyles.userProfileDropdown}`, className)}>
            <li>
                <Link
                    to={
                        `/dashboard${isNormalUser && '/user' || isAgentUser && '/agent' || isAdminUser && '/admin'}/profile`
                    }
                    title="Profile"
                >
                    <span><Icon icon="gg:profile" /></span>
                    <span>Profile</span>
                </Link>
            </li>
            <li>
                <Link
                    to={
                        `/dashboard${isNormalUser && '/user/my-parcels' || isAdminUser && '/admin/overview' || (isAgentUser && (user.agentRequestStatus !== 'pending' && user.agentRequestStatus !== 'rejected') ? '/agent/delivery-list' : '/agent/profile')
                        }`
                    }
                    title="Settings"
                >
                    <span><Icon icon="material-symbols:dashboard" /></span>
                    <span>Dashboard</span>
                </Link>
            </li>

            <LogoutButton className="hover:bg-gray-100 py-2 justify-start" />
        </ul>
    );
};

export default UserMenuDropdown;