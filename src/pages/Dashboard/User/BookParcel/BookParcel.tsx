import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { EventType, IRootState, SelectOptionType } from "../../../../types/types";
import InputWithLabel from "../../../../components/Inputs/InputWithLabel";
import Select, { MultiValue, SingleValue } from 'react-select';
import { districtsData } from "../../../../constants/districtsData";
import { useEffect, useState } from "react";
import { customSelectStyles } from "../../../../styles/customSelectStyles";
import { useBookAParcelMutation } from "../../../../redux/api/endpoints/parcelApi";
import toast from "react-hot-toast";
import { getValidDistrictSelection, getValidSubDistrictSelection } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

type IFormInput = {
    senderName: string;
    senderPhoneNumber: string;
    senderFullAddress: string;
    receiverName: string;
    receiverEmail: string;
    receiverPhoneNumber: string;
    receiverFullAddress: string;
    parcelWeight: number;
    requestedDeliveryDate: Date
}

const BookParcel = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [bookAParcel, { isLoading }] = useBookAParcelMutation();
    console.log(isLoading);

    const parcelTypeOptions = [
        { value: 'Document', label: 'Document' },
        { value: 'Box', label: 'Box' }
    ];
    const [selectedParcelType, setSelectedParcelType] = useState<SingleValue<SelectOptionType>>({
        value: '',
        label: 'Select Parcel Type'
    })
    const [parcelTypeError, setParcelTypeError] = useState<string>('');
    const [calculatedParcelPrice, setCalculatedPrice] = useState<number>(0);
    const [parcelWeightError, setParcelWeightError] = useState<string>('');

    const handleParcelPriceCalculate = (e: EventType) => {
        const perKgPrice = 50;
        const weight = Number(e.target.value);
        if (weight < 0) {
            setParcelWeightError('Negative Parcel Weight is not allowed');
            setCalculatedPrice(0);
            return;
        }
        else if (weight > 10) {
            setParcelWeightError('Maximum Parcel Weight is 10 kg');
            setCalculatedPrice(0);
            return;
        } else {
            setParcelWeightError('');
        }

        setCalculatedPrice(weight * perKgPrice);
    };

    // Register the field separately
    const parcelWeightRegister = register('parcelWeight', {
        required: 'Parcel weight is required'
    });

    // Create a combined onChange handler
    const handleCombinedChange = (e: EventType) => {
        handleParcelPriceCalculate(e);
        parcelWeightRegister.onChange(e);

    };

    // Select Error State
    const [senderDistrictError, setSenderDistrictError] = useState<string>('');
    const [senderSubDistrictError, setSenderSubDistrictError] = useState<string>('');
    const [receiverDistrictError, setReceiverDistrictError] = useState<string>('');
    const [receiverSubDistrictError, setReceiverSubDistrictError] = useState<string>('');

    //*---------------- Sender Functionality Area Start ----------------//
    // Find initial selected district from districtsData based on user's district
    const senderDistrict = districtsData.find(district => district.district === user?.district);

    // Sender District Functionality Area
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

    //------------- Sender Sub-District Functionality Area -------------//
    const senderSubDistrict = senderDistrict?.subDistricts?.find(subDistrict => subDistrict === user?.subDistrict);

    // Correctly initialize selectedSubDistrict with the user's sub-district if available, or null
    const [selectedSenderSubDistrict, setSelectedSenderSubDistrict] = useState<SingleValue<SelectOptionType>>(
        senderSubDistrict ? {
            value: senderSubDistrict,
            label: senderSubDistrict,
        } : null
    );

    const defaultSubDistrict: SelectOptionType = {
        value: '',
        label: 'Select Sub-District',
    };

    // Adjusted handleDistrictChange function
    const handleSenderDistrictChange = (
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

    //*---------------- Sender Functionality Area End ----------------//


    //*---------------- Receiver Functionality Area Start ----------------//
    // Receiver Selected District
    const [selectedReceiverDistrict, setSelectedReceiverDistrict] = useState<SingleValue<SelectOptionType>>(
        {
            value: '',
            label: 'Select District'
        }
    );


    const [selectedReceiverSubDistrict, setSelectedReceiverSubDistrict] = useState<SingleValue<SelectOptionType>>(
        {
            value: '',
            label: 'Select Sub-District'
        }
    );


    // Adjusted handleReceiverDistrictChange function
    const handleReceiverDistrictChange = (
        newValue: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
    ): void => {
        // Since we're only interested in single selections, cast newValue to SingleValue
        const selectedOption = newValue as SingleValue<SelectOptionType>;

        setSelectedReceiverDistrict(selectedOption);
        setSelectedReceiverSubDistrict(null);
    };

    // Filter sub-district options based on selected district
    const receiverSubDistrictOptions: SelectOptionType[] = selectedReceiverDistrict
        ? districtsData.find((district) => district.district === selectedReceiverDistrict.value)?.subDistricts.map((subDistrict) => ({
            value: subDistrict,
            label: subDistrict,
        })) || []
        : [];

    //*---------------- Receiver Functionality Area End ----------------//

    const handleParcelTypeChange = (
        newValue: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
    ): void => {
        const selectedOption = newValue as SingleValue<SelectOptionType>;
        setSelectedParcelType(selectedOption);
    }

    const handleBookParcel = (data: IFormInput) => {
        let hasError = false;

        if (!selectedSenderDistrict) {
            setSenderDistrictError('Please select a district.');
            hasError = true;
        }

        if (!selectedSenderSubDistrict) {
            setSenderSubDistrictError('Please select a sub-district.');
            hasError = true;
        }

        if (!selectedReceiverDistrict?.value) {
            setReceiverDistrictError('Please select a district.');
            hasError = true;
        }

        if (!selectedReceiverSubDistrict?.value) {
            setReceiverSubDistrictError('Please select a sub-district.');
            hasError = true;
        }

        if (!selectedParcelType?.value) {
            setParcelTypeError('Please select parcel type.');
            hasError = true;
        }
        if (parcelWeightError) {
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const parcelBookingData = {
            senderId: user?._id,
            senderName: data.senderName,
            senderEmail: user?.email,
            senderPhoneNumber: data.senderPhoneNumber,
            senderAddress: {
                district: selectedSenderDistrict?.value,
                subDistrict: selectedSenderSubDistrict?.value,
                fullAddress: data.senderFullAddress
            },
            receiverName: data.receiverName,
            receiverEmail: data.receiverEmail,
            receiverPhoneNumber: data.receiverPhoneNumber,
            deliveryAddress: {
                fullAddress: data.receiverFullAddress,
                district: selectedReceiverDistrict?.value,
                subDistrict: selectedReceiverSubDistrict?.value
            },
            parcelType: selectedParcelType?.value,
            parcelWeight: data.parcelWeight,
            price: calculatedParcelPrice,
            requestedDeliveryDate: data.requestedDeliveryDate
        }

        const bookingResponse = bookAParcel(parcelBookingData).unwrap();
        toast.promise(bookingResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                console.log(242, bookingResponse);
                return message;
            },
            error: ({ data }) => {
                console.log(246, bookingResponse);
                return data.message || 'Parcel booking failed'
            }
        });

    }

    useEffect(() => {
        if (selectedSenderDistrict) {
            setSenderDistrictError('');
        }
        if (selectedSenderSubDistrict) {
            setSenderSubDistrictError('');
        }
        if (selectedReceiverDistrict?.value) {
            setReceiverDistrictError('');
        }
        if (selectedReceiverSubDistrict?.value) {
            setReceiverSubDistrictError('');
        }
        if (selectedParcelType?.value) {
            setParcelTypeError('');
        }
    }, [selectedSenderDistrict, selectedSenderSubDistrict, selectedReceiverDistrict, selectedReceiverSubDistrict, selectedParcelType]);



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
                    <div>
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
                                                required: 'Sender name is required',
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

                                {/* Sender Email */}
                                <InputWithLabel
                                    type="email"
                                    id="sender-email"
                                    label="Sender Email"
                                    placeholder="sender email"
                                    value={user?.email}
                                    isDisabled={true}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sender Phone Number */}
                                <div>
                                    <InputWithLabel
                                        type="number"
                                        id="sender-phone"
                                        label="Sender Phone"
                                        placeholder="sender phone number"
                                        defaultValue={user?.phoneNumber}
                                        register={{
                                            ...register('senderPhoneNumber', {
                                                required: 'Sender phone number is required',
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
                                                required: 'Sender full address is required',
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sender District Select */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Sender District
                                    </label>
                                    <Select
                                        value={getValidDistrictSelection(selectedSenderDistrict, defaultDistrict)}
                                        onChange={handleSenderDistrictChange}
                                        options={districtsData.map((district) => ({
                                            value: district.district,
                                            label: district.district,
                                        }))}
                                        placeholder="Select District"
                                        styles={customSelectStyles}
                                    />

                                    {senderDistrictError && <p className="error">{senderDistrictError}</p>}
                                </div>

                                {/* Sender Sub-district Select */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Sender Sub-District
                                    </label>
                                    <Select
                                        value={getValidSubDistrictSelection(selectedSenderSubDistrict, defaultSubDistrict)}
                                        onChange={(option) => setSelectedSenderSubDistrict(option as SingleValue<SelectOptionType>)}
                                        options={senderSubDistrictOptions}
                                        placeholder="Select Sub-district"
                                        styles={customSelectStyles}
                                    />

                                    {senderSubDistrictError && <p className="error">{senderSubDistrictError}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Receiver Section */}
                    <div className="my-7">
                        <h1 className="text-xl font-semibold text-black-50 mb-3">Receiver Information</h1>
                        <div className="flex flex-col gap-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/*Receiver Name */}
                                <div>
                                    <InputWithLabel
                                        type="text"
                                        id="receiver-name"
                                        label="Receiver Name"
                                        placeholder="receiver name"
                                        register={{
                                            ...register('receiverName', {
                                                required: 'Receiver name is required',
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

                                    {errors?.receiverName?.message && <p className="error">{errors?.receiverName?.message}</p>}
                                </div>

                                {/* Receiver Email */}
                                <div>
                                    <InputWithLabel
                                        type="email"
                                        id="receiver-email"
                                        label="Receiver Email"
                                        placeholder="receiver email"
                                        register={{
                                            ...register('receiverEmail', {
                                                required: 'Receiver email is required', pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Provide a valid email'
                                                }
                                            })
                                        }}
                                    />

                                    {errors?.receiverEmail?.message && <p className="error">{errors?.receiverEmail?.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Receiver Phone Number */}
                                <div>
                                    <InputWithLabel
                                        type="number"
                                        id="receiver-phone"
                                        label="Receiver Phone"
                                        placeholder="receiver phone number"
                                        register={{
                                            ...register('receiverPhoneNumber', {
                                                required: 'Receiver phone number is required',
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

                                    {errors?.receiverPhoneNumber?.message && <p className="error">{errors?.receiverPhoneNumber?.message}</p>}
                                </div>

                                {/* Receiver Full Address */}
                                <div>
                                    <InputWithLabel
                                        type="text"
                                        id="receiver-fullAddress"
                                        label="Receiver Full Address"
                                        placeholder="receiver full address"
                                        register={{
                                            ...register('receiverFullAddress', {
                                                required: 'Receiver full address is required',
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

                                    {errors?.receiverFullAddress?.message && <p className="error">{errors?.receiverFullAddress?.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Receiver District Select */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Receiver District
                                    </label>
                                    <Select
                                        value={selectedReceiverDistrict}
                                        onChange={handleReceiverDistrictChange}
                                        options={districtsData.map((district) => ({
                                            value: district.district,
                                            label: district.district,
                                        }))}
                                        placeholder="Select District"
                                        styles={customSelectStyles}
                                    />

                                    {receiverDistrictError && <p className="error">{receiverDistrictError}</p>}
                                </div>

                                {/* Sender Sub-district Select */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Receiver Sub-District
                                    </label>
                                    <Select
                                        value={getValidSubDistrictSelection(selectedReceiverSubDistrict, defaultSubDistrict)}
                                        onChange={(option) => setSelectedReceiverSubDistrict(option as SingleValue<SelectOptionType>)}
                                        options={receiverSubDistrictOptions}
                                        placeholder="Select Sub-district"
                                        styles={customSelectStyles}
                                    />

                                    {receiverSubDistrictError && <p className="error">{receiverSubDistrictError}</p>}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Parcel Details Section */}
                    <div className="my-7">
                        <h1 className="text-xl font-semibold text-black-50 mb-3">Parcel Details</h1>

                        <div className="flex flex-col gap-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Parcel Type */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Parcel Type
                                    </label>


                                    <Select
                                        value={selectedParcelType}
                                        onChange={handleParcelTypeChange}
                                        placeholder="Select Parcel Type"
                                        styles={customSelectStyles}
                                        options={parcelTypeOptions}
                                    />
                                    {parcelTypeError && <p className="error">{parcelTypeError}</p>}

                                </div>

                                {/* Parcel Weight */}
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor='parcel-weight'
                                    >
                                        Parcel Weight
                                    </label>
                                    <input
                                        type="number"
                                        id="parcel-weight"
                                        placeholder="Enter parcel weight (kg)"
                                        className={"flex w-full rounded-md border border-[#ddd] focus:ring-2 focus:ring-secondary px-3 py-3 text-sm outline-none"}
                                        {...parcelWeightRegister}
                                        onChange={handleCombinedChange}
                                    />

                                    {parcelWeightError && <p className="error">{parcelWeightError}</p>}

                                    {errors.parcelWeight?.message && <p className="error">{errors.parcelWeight?.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Requested Delivery Date */}
                                <div>
                                    <InputWithLabel
                                        type="date"
                                        id="requested-delivery-date"
                                        label="Requested Delivery Date"
                                        placeholder="requested delivery date"
                                        register={{
                                            ...register('requestedDeliveryDate', {
                                                required: 'Requested delivery date is required',
                                            })
                                        }}
                                    />
                                    {errors?.requestedDeliveryDate?.message && <p className="error">{errors?.requestedDeliveryDate?.message}</p>}
                                </div>

                                <div>
                                    <InputWithLabel
                                        value={calculatedParcelPrice}
                                        type="number"
                                        id="price"
                                        label="Price"
                                        placeholder="price"
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-end gap-x-3">
                        <button
                            type="submit"
                            className={`btn-primary py-3 w-40 flex justify-center rounded-md ${isLoading && 'disabled:btn-disabled'}`}
                            disabled={isLoading}
                        >
                            {
                                isLoading ? <Icon className="animate-spin text-2xl" icon="mingcute:loading-fill" /> : 'Book Parcel'
                            }

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;