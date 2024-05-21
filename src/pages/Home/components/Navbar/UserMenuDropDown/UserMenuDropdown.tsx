import userDropdownStyles from "./userMenuDropdown.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react"
import { removeUser } from "../../../../../redux/slices/user/userSlice";
import { IRootState } from "../../../../../types/types";

const UserMenuDropdown = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const isAgentUser = user?.role === 'agent';
    const isAdminUser = user?.role === 'admin';
    const isNormalUser = user?.role === 'user';

    return (
        <>
            <div>

            </div>
            <ul className={`${userDropdownStyles.userProfileDropdown}`}>
                <li>
                    <Link
                        to={`#`}
                        title="Profile"
                    >
                        <span><Icon icon="gg:profile" /></span>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to={
                            `/dashboard${isNormalUser && '/user/my-parcels' || isAdminUser && '/admin/overview' || isAgentUser && '/agent/delivery-list'}`
                        }
                        title="Settings"
                    >
                        <span><Icon icon="material-symbols:dashboard" /></span>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        title="Logout"
                        onClick={() => {
                            Cookies.remove('authToken');
                            dispatch(removeUser());
                        }}

                    >
                        <Icon icon="material-symbols:logout" />
                        <span>Logout</span>
                    </button>
                </li>

            </ul>
        </>
    );
};

export default UserMenuDropdown;