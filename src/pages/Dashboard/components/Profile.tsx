import { Icon } from "@iconify/react/dist/iconify.js";
import defaultAvatar from "../../../assets/images/noavatar.png"
const Profile = () => {
    return (
        <div>
            {/* Profile Info */}
            <div className="border rounded-md p-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <img className="w-48 h-48 object-cover rounded-full" alt="user image" src={defaultAvatar} />
                    <div className="flex justify-start items-center flex-col gap-3">
                        <button type='button' className=' text-white bg-gradient-to-l from-green-400 to-green-500 py-3 rounded-md  px-10 flex justify-center items-center gap-x-2  w-full border border-transparent hover:border-green-400' onClick={() => open()}>
                            <span className='text-2xl'><Icon icon="lucide:image-plus" /></span>
                            <span>Upload New Image</span>
                        </button>

                        <button className="bg-red-500  border border-transparent hover:border-red-500 text-white font-semibold px-2 py-3 rounded w-full">Remove Picture</button>
                    </div>
                </div>
            </div>

            {/* Password Update */}
            <div>
                Password Update
            </div>
        </div>
    );
};

export default Profile;