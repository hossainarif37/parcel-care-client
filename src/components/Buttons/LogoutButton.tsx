import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/user/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";
type LogoutButtonPropsType = {
    className?: string;
}
const LogoutButton = ({ className }: LogoutButtonPropsType) => {
    const dispatch = useDispatch();
    return (
        <button
            className={cn('w-full flex items-center font-semibold text-black-100 justify-center gap-2 px-4 py-2 xl:py-3 text-sm duration-150', className)}
            type="button"
            title="Logout"
            onClick={() => {
                Cookies.remove('authToken');
                dispatch(removeUser());
            }}

        >
            <Icon icon="material-symbols:logout"  />
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;