import { Icon } from "@iconify/react/dist/iconify.js";
import blank_avatar from "../../../../assets/icons/profile_blank_image.png"
import { useState } from "react";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";
import { useForm } from "react-hook-form";
import UpdatePasswordArea from "./UpdatePasswordArea";
import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from "react-select";
import { districtsData } from "../../../../constants/districtsData";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../types/types";
import { useUpdateUserInfoMutation } from "../../../../redux/api/endpoints/userApi";
import toast from "react-hot-toast";

type IFormInput = {
    name: string;
    email: string;
    profilePicture?: string;
    phoneNumber?: number;
    fullAddress?: string;
    subDistrict?: string;
    district?: string;
}

// Define types for district and sub-district data
type OptionType = {
    value: string;
    label: string;
};


const Profile = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [updateUserInfo, { data, isError, isLoading }] = useUpdateUserInfoMutation();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    //------------- District Functionality Area -------------//
    // Find initial selected district from districtsData based on user's district
    const userDistrict = districtsData.find(district => district.district === user?.district);

    // District Functionality Area
    const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<OptionType>>(
        userDistrict ? {
            value: userDistrict.district,
            label: userDistrict.district,
        } : null
    );

    const defaultDistrict: OptionType = {
        value: '',
        label: 'Select District',
    };

    const getValidDistrictSelection = (): OptionType => {
        if (!selectedDistrict) {
            return defaultDistrict;
        }
        return {
            value: selectedDistrict.value ?? '',
            label: selectedDistrict.label ?? '',
        };
    };


    //------------- Sub-District Functionality Area -------------//
    const userSubDistrict = userDistrict?.subDistricts?.find(subDistrict => subDistrict === user?.subDistrict);
    // Correctly initialize selectedSubDistrict with the user's sub-district if available, or null
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<SingleValue<OptionType>>(
        userSubDistrict ? {
            value: userSubDistrict,
            label: userSubDistrict,
        } : null
    );


    const defaultSubDistrict: OptionType = {
        value: '',
        label: 'Select Sub-District',
    };


    const getValidSubDistrictSelection = (): OptionType => {
        if (!selectedSubDistrict) {
            return defaultSubDistrict;
        }
        return {
            value: selectedSubDistrict.value ?? '',
            label: selectedSubDistrict.label ?? '',
        };
    };

    // Adjusted handleDistrictChange function
    const handleDistrictChange = (
        newValue: SingleValue<OptionType> | MultiValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ): void => {
        // Since we're only interested in single selections, cast newValue to SingleValue
        const selectedOption = newValue as SingleValue<OptionType>;

        setSelectedDistrict(selectedOption);
        setSelectedSubDistrict(null);
    };

    // Filter sub-district options based on selected district
    const subDistrictOptions: OptionType[] = selectedDistrict
        ? districtsData.find((district) => district.district === selectedDistrict.value)?.subDistricts.map((subDistrict) => ({
            value: subDistrict,
            label: subDistrict,
        })) || []
        : [];



    const handleUpdateProfileInfo = (data: IFormInput) => {
        // Check if selectedDistrict and selectedSubDistrict are defined and add them to the data object
        console.log('Clicked');
        const updatedData = {
            ...data,
            ...(selectedDistrict && { district: selectedDistrict.value }),
            ...(selectedSubDistrict && { subDistrict: selectedSubDistrict.value }),
        };
        console.log('Updated Data', updatedData);

        // const updatedResponse = updateUserInfo({ userId: user?._id, body: updatedData }).unwrap();


        // console.log(updatedResponse);

        // toast.promise(updatedResponse, {
        //     loading: 'Loading',
        //     success: ({ message }) => message,
        //     error: ({ data }) => data?.message || 'Update failed'
        // });


        setIsEditClicked(false);
    }


    // Custom styles for react-select
    const customStyles: StylesConfig<OptionType> = {
        control: (provided, state) => ({
            ...provided,
            padding: "3.5px", // Add padding
            outline: state.isFocused ? "1px solid #7D82FF" : "none", // Add outline color on focus
            borderColor: state.isFocused ? "#7D82FF" : '#ddd', // Change border color on focus
            "&:hover": {
                borderColor: state.isFocused ? "#7D82FF" : '#ddd',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#9FA9B4", // Change placeholder color
        })
    };


    return (
        <div className="py-10">
            {/* Profile Info Area*/}
            <div className="max-w-4xl mx-auto py-10 px-5 md:px-20 border rounded-md  mb-5">
                {/* Image area */}
                <div className="flex flex-col gap-y-5 md:gap-y-0 mb-5 md:flex-row items-center justify-center gap-x-5">
                    <img className="w-28 md:w-40 md:h-40 shadow ring-4 ring-secondary ring-opacity-60 ring-offset-2 h-28  object-cover rounded-full" alt="user image" src={blank_avatar} />

                    <div className="flex justify-start items-center flex-col gap-3">
                        {/* Upload Image Button */}
                        <button
                            type='button'
                            className={`btn-primary w-full py-3 px-14 flex justify-center gap-x-2`}
                        >
                            <span className='text-2xl'><Icon icon="lucide:image-plus" /></span>
                            <span>Upload New Image</span>
                        </button>

                        <button
                            type="button"
                            className={`btn-delete w-full py-3 px-14 flex justify-center gap-x-2`}
                        >
                            Remove Picture
                        </button>
                    </div>
                </div>


                {/* Form Fields */}
                <form onSubmit={handleSubmit(handleUpdateProfileInfo)} className="flex flex-col gap-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <InputWithLabel
                            type="text"
                            id="name"
                            label="Name"
                            placeholder="name"
                            register={{
                                ...register('name', {
                                    required: 'Name is required',
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

                        {/* Email */}
                        <InputWithLabel
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="email"
                            value={user?.email}
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
                                value={getValidDistrictSelection()}
                                onChange={handleDistrictChange}
                                options={districtsData.map((district) => ({
                                    value: district.district,
                                    label: district.district,
                                }))}
                                placeholder="Select District"
                                styles={customStyles}
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
                                value={getValidSubDistrictSelection()}
                                onChange={(option) => setSelectedSubDistrict(option as SingleValue<OptionType>)}
                                options={subDistrictOptions}
                                placeholder="Select Sub-district"
                                styles={customStyles}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Address */}
                        <InputWithLabel
                            type="text"
                            id="full-address"
                            label="Full Address"
                            placeholder="full address"
                            register={{
                                ...register('fullAddress', {
                                    required: 'Address is required',
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

                        {/* Phone Number */}
                        <InputWithLabel
                            type="number"
                            id="phone-number"
                            label="Phone Number"
                            placeholder="phone number"
                            register={{
                                ...register('phoneNumber', {
                                    maxLength: {
                                        value: 20,
                                        message: 'Maximum length 20 digit'
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'Minimum length 11 digit'
                                    }
                                })
                            }}
                        />
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