import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IRootState, SelectOptionType } from "../../../../types/types";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";
import Select, { MultiValue, SingleValue } from 'react-select';
import { getValidDistrictSelection, getValidSubDistrictSelection } from "../../../../utils/utils";
import { districtsData } from "../../../../constants/districtsData";
import { useState } from "react";
import { customSelectStyles } from "../../../../styles/customSelectStyles";

type IFormInput = {
    senderName: string;
    senderPhoneNumber: string;
    senderFullAddress: string;
}

const BookParcel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const { user } = useSelector((state: IRootState) => state.userSlice);

    //------------- District Functionality Area -------------//
    // Find initial selected district from districtsData based on user's district
    const senderDistrict = districtsData.find(district => district.district === user?.district);

    // District Functionality Area
    const [selectedSenderDistrict, setSelectedSenderDistrict] = useState<SingleValue<SelectOptionType>>(
        senderDistrict ? {
            value: senderDistrict.district,
            label: senderDistrict.district,
        } : null
    );

    const defaultDistrict: SelectOptionType = {
        value: '',
        label: 'Select District',
    };

    //------------- Sub-District Functionality Area -------------//
    const senderSubDistrict = senderDistrict?.subDistricts?.find(subDistrict => subDistrict === user?.subDistrict);
    // Correctly initialize selectedSubDistrict with the user's sub-district if available, or null
    const [selectedSenderSubDistrict, setSelectedSenderSubDistrict] = useState<SingleValue<SelectOptionType>>(
        senderSubDistrict ? {
            value: senderSubDistrict,
            label: senderSubDistrict,
        } : null
    );

    const [senderSubDistrictError, setSenderSubDistrictError] = useState<string>('');


    const defaultSenderSubDistrict: SelectOptionType = {
        value: '',
        label: 'Select Sub-District',
    };



    // Adjusted handleDistrictChange function
    const handleDistrictChange = (
        newValue: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
    ): void => {
        // Since we're only interested in single selections, cast newValue to SingleValue
        const selectedOption = newValue as SingleValue<SelectOptionType>;

        setSelectedSenderDistrict(selectedOption);
        setSelectedSenderSubDistrict(null);
    };

    // Filter sub-district options based on selected district
    const senderSubDistrictOptions: SelectOptionType[] = selectedSenderDistrict
        ? districtsData.find((district) => district.district === selectedSenderDistrict.value)?.subDistricts.map((subDistrict) => ({
            value: subDistrict,
            label: subDistrict,
        })) || []
        : [];

    const handleBookParcel = (data: IFormInput) => {
        const parcelBookingData = {
            senderName: data.senderName,
            senderEmail: user?.email,
            senderPhoneNumber: data.senderPhoneNumber,
            senderAddress: {
                district: selectedSenderDistrict?.value,
                subDistrict: selectedSenderSubDistrict?.value,
                fullAddress: data.senderFullAddress
            }
        }
        console.log(parcelBookingData);
    }
    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto py-10 px-5 md:px-20 border rounded-md  mb-5">

                {/* header section */}
                <div className="mb-10">
                    <h1 className="text-2xl font-semibold text-black-50">Book a Parcel</h1>
                    <p>Fill out the form to book a parcel delivery.</p>
                </div>

                {/* form section */}
                <form onSubmit={handleSubmit(handleBookParcel)}>

                    {/* Sender Section */}
                    <h1 className="text-xl font-semibold text-black-50 mb-3">Sender Information</h1>
                    <div className="flex flex-col gap-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/*Sender Name */}
                            <div>
                                <InputWithLabel
                                    type="text"
                                    id="sender-name"
                                    label="Sender Name"
                                    placeholder="sender name"
                                    defaultValue={user?.name}
                                    register={{
                                        ...register('senderName', {
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

                                {errors?.senderName?.message && <p className="error">{errors?.senderName?.message}</p>}
                            </div>

                            {/* Email */}
                            <InputWithLabel
                                type="email"
                                id="sender-email"
                                label="Sender Email"
                                placeholder="sender email"
                                value={user?.email}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Phone Number */}
                            <div>
                                <InputWithLabel
                                    type="number"
                                    id="sender-phone"
                                    label="Sender Phone"
                                    placeholder="phone number"
                                    defaultValue={user?.phoneNumber}
                                    register={{
                                        ...register('senderPhoneNumber', {
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

                                {errors?.senderPhoneNumber?.message && <p className="error">{errors?.senderPhoneNumber?.message}</p>}
                            </div>

                            {/* District Select */}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Sender District
                                </label>
                                <Select
                                    value={getValidDistrictSelection(selectedSenderDistrict, defaultDistrict)}
                                    onChange={handleDistrictChange}
                                    options={districtsData.map((district) => ({
                                        value: district.district,
                                        label: district.district,
                                    }))}
                                    placeholder="Select District"
                                    styles={customSelectStyles}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sub-district Select */}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Sender Sub-District
                                </label>
                                <Select
                                    value={getValidSubDistrictSelection(selectedSenderSubDistrict, defaultSenderSubDistrict)}
                                    onChange={(option) => setSelectedSenderSubDistrict(option as SingleValue<SelectOptionType>)}
                                    options={senderSubDistrictOptions}
                                    placeholder="Select Sub-district"
                                    styles={customSelectStyles}
                                />

                                {senderSubDistrictError && <p className="error">{senderSubDistrictError}</p>}
                            </div>

                            {/*Sender Full Address */}
                            <div>
                                <InputWithLabel
                                    type="text"
                                    id="sender-fullAddress"
                                    label="Sender Full Address"
                                    placeholder="sender full address"
                                    defaultValue={user?.fullAddress}
                                    register={{
                                        ...register('senderFullAddress', {
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

                                {errors?.senderFullAddress?.message && <p className="error">{errors?.senderFullAddress?.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-x-3">
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn-primary py-3 px-10 rounded-md"
                            >
                                Book Parcel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;