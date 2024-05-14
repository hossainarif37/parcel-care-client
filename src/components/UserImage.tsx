import profile_blank_image from "../assets/icons/profile_blank_image.png"

type UserImagePropsTypes = {
    profilePicture?: string;
    customWidth: string;
    isProfileDropdownBtn?: boolean;
}

const UserImage = ({ profilePicture, customWidth, isProfileDropdownBtn }: UserImagePropsTypes) => {

    // const dispatch = useDispatch();

    // const { isProfileDropdown } = useSelector((state: IRootState) => state.navbarSlice);

    // const handleProfileDropdown = () => {
    //     isProfileDropdownBtn && dispatch(toggleProfileDropdown());
    // }


    return (
        <>
            <div
                // onClick={handleProfileDropdown}
                className="relative cursor-pointer group rounded-full ring-4 ring-secondary" title="Account"
            >

                <img className={`${customWidth} relative cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} alt="" />

                {/* {(isProfileDropdown && isProfileDropdownBtn) && <UserMenuDropdown />} */}
            </div>


        </>
    );
};

export default UserImage;
