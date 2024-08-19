import { Icon } from "@iconify/react/dist/iconify.js";
import blank_avatar from "../../../../assets/icons/profile_blank_image.png"
import { useEffect, useState } from "react";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";
import { useForm } from "react-hook-form";
import UpdatePasswordArea from "./UpdatePasswordArea";
import Select, { MultiValue, SingleValue } from "react-select";
import { districtsData } from "../../../../constants/districtsData";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, SelectOptionType, UserType } from "../../../../types/types";
import { useUpdateUserInfoMutation } from "../../../../redux/api/endpoints/userApi";
import toast from "react-hot-toast";
import { updateUser } from "../../../../redux/slices/user/userSlice";
import { customSelectStyles } from "../../../../styles/customSelectStyles";
import { getValidDistrictSelection, getValidSubDistrictSelection } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { clear } from "console";

type IFormInput = {
    name: string;
    email: string;
    phoneNumber?: number;
    fullAddress?: string
}


const Profile = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [tempImageUrl, setTempImageUrl] = useState('');
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImage(file);

        // Convert the image to base64 URL for temporary preview
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result !== null) {
                const base64String = reader.result as string;
                setTempImageUrl(base64String);
            }
        };
        reader.readAsDataURL(file);
    };
    console.log('tempImageUrl', tempImageUrl);



    // List of fields considered for profile completion calculation
    const requiredFields = ['name', 'email', 'profilePicture', 'phoneNumber', 'fullAddress', 'subDistrict', 'district'];

    // Function to check if a field is filled
    const isFieldFilled = (field: string): boolean => {
        return field in (user as UserType) ? true : false;
    };

    // Count the number of filled fields
    const filledFieldsCount = requiredFields.filter(isFieldFilled).length;

    // Calculate completion percentage
    const totalFields = requiredFields.length;
    // Calculate completion percentage and format it as an integer percentage
    const completionPercentage = Math.round(filledFieldsCount / totalFields * 100);

    console.log(completionPercentage);

    //------------- District Functionality Area -------------//
    // Find initial selected district from districtsData based on user's district
    const userDistrict = districtsData.find(district => district.district === user?.district);

    // District Functionality Area
    const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<SelectOptionType>>(
        userDistrict ? {
            value: userDistrict.district,
            label: userDistrict.district,
        } : null
    );

    const defaultDistrict: SelectOptionType = {
        value: '',
        label: 'Select District',
    };


    //------------- Sub-District Functionality Area -------------//
    const userSubDistrict = userDistrict?.subDistricts?.find(subDistrict => subDistrict === user?.subDistrict);
    // Correctly initialize selectedSubDistrict with the user's sub-district if available, or null
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<SingleValue<SelectOptionType>>(
        userSubDistrict ? {
            value: userSubDistrict,
            label: userSubDistrict,
        } : null
    );

    const [subDistrictError, setSubDistrictError] = useState<string>('');


    const defaultSubDistrict: SelectOptionType = {
        value: '',
        label: 'Select Sub-District',
    };



    // Adjusted handleDistrictChange function
    const handleDistrictChange = (
        newValue: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
    ): void => {
        // Since we're only interested in single selections, cast newValue to SingleValue
        const selectedOption = newValue as SingleValue<SelectOptionType>;

        setSelectedDistrict(selectedOption);
        setSelectedSubDistrict(null);
    };

    // Filter sub-district options based on selected district
    const subDistrictOptions: SelectOptionType[] = selectedDistrict
        ? districtsData.find((district) => district.district === selectedDistrict.value)?.subDistricts.map((subDistrict) => ({
            value: subDistrict,
            label: subDistrict,
        })) || []
        : [];

    const handleUpdateProfileInfo = (data: IFormInput) => {
        // Check if selectedDistrict and selectedSubDistrict are defined and add them to the data object
        console.log('Clicked');
        // Check if a district is selected but no sub-district is selected
        if (selectedDistrict && !selectedSubDistrict) {
            // Set an error for the sub-district field
            setSubDistrictError('Please select a sub-district.');
            return;
        }

        const updatedData = {
            ...data,
            ...(selectedDistrict && { district: selectedDistrict.value }),
            ...(selectedSubDistrict && { subDistrict: selectedSubDistrict.value }),
        };

        const updatedResponse = updateUserInfo({ userId: user?._id, body: updatedData }).unwrap();

        toast.promise(updatedResponse, {
            loading: 'Loading',
            success: ({ user, message }) => {
                dispatch(updateUser({ user: user }));
                return message;
            },
            error: ({ data }) => data?.message || 'Update failed'
        });

        setIsEditClicked(false);
    }

    useEffect(() => {
        if (selectedSubDistrict) {
            // Set an error for the sub-district field
            setSubDistrictError('');
        }

    }, [selectedSubDistrict])


    return (
        <div className="py-10">
            {/* Profile Info Area*/}
            <div className="max-w-4xl mx-auto py-10 px-5 md:px-20 border rounded-md  mb-5">
                {/* Image area */}
                <div className="flex flex-col gap-y-5 md:gap-y-0 mb-5 md:flex-row items-center justify-center gap-x-5">
                    <div className="shadow ring-4 ring-secondary ring-opacity-60 ring-offset-2 rounded-full overflow-hidden" >
                        <img className="w-28 md:w-40 md:h-40  h-28  object-contain scale-125 rounded-full" alt="user image" src={tempImageUrl ? tempImageUrl : blank_avatar} />
                    </div>

                    <div className="flex justify-start items-center flex-col gap-3">
                        {/* Upload Image Button */}
                        <input
                            onChange={handleImageChange}
                            className="hidden" type="file" name="upload-image" id="upload-image" />
                        <label
                            htmlFor="upload-image"
                            className={`btn-primary w-full py-3 px-14 flex justify-center gap-x-2`}
                        >
                            <span className='text-2xl'><Icon icon="lucide:image-plus" /></span>
                            <span>Upload New Image</span>
                        </label>

                        <button
                            onClick={() => { setTempImageUrl('') }}
                            type="button"
                            className={`btn-delete w-full py-3 px-14 flex justify-center gap-x-2`}
                        >
                            Remove Picture
                        </button>
                    </div>
                </div>

                <div className="space-y-2 my-10">
                    <p className="text-black-100 font-semibold">
                        Profile Completion: <span>{completionPercentage}%</span>
                    </p>
                    <Progress value={completionPercentage} className="w-full" indicatorColor={"gradient"} />
                </div>
                {/* Form Fields */}
                <form onSubmit={handleSubmit(handleUpdateProfileInfo)} className="flex flex-col gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <InputWithLabel
                                type="text"
                                id="name"
                                label="Name"
                                placeholder="name"
                                defaultValue={user?.name}
                                register={{
                                    ...register('name', {
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximum length 20 characters'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Minimum length 3 characters'
                                        }
                                    })
                                }}
                            />

                            {errors?.name?.message && <p className="error">{errors?.name?.message}</p>}
                        </div>

                        {/* Email */}
                        <InputWithLabel
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="email"
                            value={user?.email}
                            isDisabled={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* District Select */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                District
                            </label>
                            <Select
                                value={getValidDistrictSelection(selectedDistrict, defaultDistrict)}
                                onChange={handleDistrictChange}
                                options={districtsData.map((district) => ({
                                    value: district.district,
                                    label: district.district,
                                }))}
                                placeholder="Select District"
                                styles={customSelectStyles}
                            />
                        </div>

                        {/* Sub-district Select */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Sub-District
                            </label>
                            <Select
                                value={getValidSubDistrictSelection(selectedSubDistrict, defaultSubDistrict)}
                                onChange={(option) => setSelectedSubDistrict(option as SingleValue<SelectOptionType>)}
                                options={subDistrictOptions}
                                placeholder="Select Sub-district"
                                styles={customSelectStyles}
                            />

                            {subDistrictError && <p className="error">{subDistrictError}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Address */}
                        <div>
                            <InputWithLabel
                                type="text"
                                id="full-address"
                                label="Full Address"
                                placeholder="full address"
                                defaultValue={user?.fullAddress}
                                register={{
                                    ...register('fullAddress', {
                                        maxLength: {
                                            value: 100,
                                            message: 'Maximum length 100 characters'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Minimum length 10 characters'
                                        }
                                    })
                                }}
                            />

                            {errors?.fullAddress?.message && <p className="error">{errors?.fullAddress?.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <InputWithLabel
                                type="number"
                                id="phone-number"
                                label="Phone Number"
                                placeholder="phone number"
                                defaultValue={user?.phoneNumber}
                                register={{
                                    ...register('phoneNumber', {
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximum length 20 digit'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Minimum length 10 digit'
                                        }
                                    })
                                }}
                            />

                            {errors?.phoneNumber?.message && <p className="error">{errors?.phoneNumber?.message}</p>}
                        </div>
                    </div>

                    {
                        isEditClicked ?
                            <div className="flex justify-end gap-x-3">
                                <button
                                    onClick={() => setIsEditClicked(false)}
                                    type="button"
                                    className="btn-accent py-3 px-10 rounded-md"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn-primary py-3 px-10 rounded-md"
                                >
                                    Save Changes
                                </button>
                            </div>

                            :

                            <button
                                onClick={() => setIsEditClicked(true)}
                                type="button"
                                className="btn-secondary text-white font-semibold py-3 px-10 rounded-md ml-auto"
                            >
                                Edit
                            </button>

                    }
                </form>
            </div>

            {/* Update Password Area */}
            <UpdatePasswordArea />
        </div>
    );
};

export default Profile;