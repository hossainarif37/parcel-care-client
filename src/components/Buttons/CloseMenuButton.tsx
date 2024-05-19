import { useDispatch } from "react-redux";
import { toggleNav } from "../../redux/slices/navbar/navbarSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const CloseMenuButton = () => {
    const dispatch = useDispatch();

    const handleNavToggle = () => {
        dispatch(toggleNav())
    }

    return (
        <button
            type="button"
            className="text-3xl pt-2"
            onClick={handleNavToggle}
        >
            <Icon icon="material-symbols:close" />
        </button>
    );
};

export default CloseMenuButton;