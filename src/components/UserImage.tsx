import { useDispatch, useSelector } from "react-redux";
import profile_blank_image from "../assets/icons/profile_blank_image.png"
import { IRootState } from "../types/types";
import UserMenuDropdown from "../pages/Home/components/Navbar/UserMenuDropDown/UserMenuDropdown";
import { toggleProfileDropdown } from "../redux/slices/navbar/navbarSlice";

type UserImagePropsTypes = {
    profilePicture?: string;
    customSize: string;
    isProfileDropdownBtn?: boolean;
}

const UserImage = ({ profilePicture, customSize, isProfileDropdownBtn }: UserImagePropsTypes) => {

    const dispatch = useDispatch();

    const { isProfileDropdown } = useSelector((state: IRootState) => state.navbarSlice);

    const handleProfileDropdown = () => {
        isProfileDropdownBtn && dispatch(toggleProfileDropdown());
    }

    return (
        <>
            <div
                onClick={handleProfileDropdown}
                className="relative cursor-pointer group" title="Profile"
            >

                <div className={`rounded-full ${customSize} ring-4 ring-secondary overflow-hidden`}>
                    <img className={`w-full h-full scale-125 relative object-contain cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} alt="" />
                </div>

                {(isProfileDropdown && isProfileDropdownBtn) && <UserMenuDropdown />}
            </div>


        </>
    );
};

export default UserImage;
