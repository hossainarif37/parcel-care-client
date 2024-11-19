import profile_blank_image from "../assets/icons/profile_blank_image.png"
import { cn } from "@/lib/utils";

type UserImagePropsTypes = {
    profilePicture?: string;
    className?: string
}

const UserImage = ({ profilePicture, className }: UserImagePropsTypes) => {
    return (
        <div className={cn(`rounded-full ring-4 ring-secondary overflow-hidden`, className)}>
            <img className={`w-full h-full scale-125 relative object-contain cursor-pointer group`} src={profilePicture ? profilePicture : profile_blank_image} alt="" />
        </div>
    );
};

export default UserImage;
