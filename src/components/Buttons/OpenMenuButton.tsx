import { useDispatch } from "react-redux";
import { toggleNav } from "../../redux/slices/navbar/navbarSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const OpenMenuButton = () => {
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
            <Icon icon="material-symbols-light:menu" />
        </button>
    );
};

export default OpenMenuButton;