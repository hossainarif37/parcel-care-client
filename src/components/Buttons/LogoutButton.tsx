import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/user/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
type LogoutButtonPropsType = {
    className?: string;
}
const LogoutButton = ({ className }: LogoutButtonPropsType) => {
    const dispatch = useDispatch();
    return (
        <button
            className={className}
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
    );
};

export default LogoutButton;