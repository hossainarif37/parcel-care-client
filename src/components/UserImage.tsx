import { useDispatch, useSelector } from "react-redux";
import profile_blank_image from "../assets/icons/profile_blank_image.png"
import { IRootState } from "../types/types";
import UserMenuDropdown from "../pages/Home/components/Navbar/UserMenuDropDown/UserMenuDropdown";
import { toggleProfileDropdown } from "../redux/slices/navbar/navbarSlice";

type UserImagePropsTypes = {
    profilePicture?: string;
    customWidth: string;
    isProfileDropdownBtn?: boolean;
}

const UserImage = ({ profilePicture, customWidth, isProfileDropdownBtn }: UserImagePropsTypes) => {

    const dispatch = useDispatch();

    const { isProfileDropdown } = useSelector((state: IRootState) => state.navbarSlice);

    const handleProfileDropdown = () => {
        isProfileDropdownBtn && dispatch(toggleProfileDropdown());
    }


    return (
        <>
            <div
                onClick={handleProfileDropdown}
                className="relative cursor-pointer group" title="Account"
            >

                <div className="rounded-full ring-4 ring-secondary">
                    <img className={`${customWidth} relative cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} alt="" />
                </div>

                {(isProfileDropdown && isProfileDropdownBtn) && <UserMenuDropdown />}
            </div>


        </>
    );
};

export default UserImage;
