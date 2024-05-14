import userDropdownStyles from "./userMenuDropdown.module.css"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react"
import { removeUser } from "../../../../../redux/slices/user/userSlice";

const UserMenuDropdown = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div>

            </div>
            <ul className={`${userDropdownStyles.userProfileDropdown} `}>
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
                        to="#"
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