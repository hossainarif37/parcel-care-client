import NotFoundData from "@/components/NotFoundData";
import { useLazyGetABookedParcelByIdQuery } from "@/redux/api/endpoints/parcelApi";
import { IParcel } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import TrackingDetails from "./TrackingDetails";
import { MapPin, Phone, User } from "lucide-react";
import { Package } from "lucide-react";

interface IFormInput {
    parcelId: string
}

const ParcelTracking = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const [getABookedParcelById, { error }] = useLazyGetABookedParcelByIdQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const [parcel, setParcel] = useState<IParcel | null>();



    // const { data: parcelResponse, isLoading } = useGetABookedParcelByIdQuery(parcelId);
    const handleSearch = (data: IFormInput) => {
        setSearchParams({ parcelId: data.parcelId });
        getABookedParcelById(data.parcelId)
            .unwrap()
            .then(({ parcel: parcelResponse }) => {
                setParcel(parcelResponse);
            }).catch(() => {
                setParcel(null);
            });
    }

    useEffect(() => {
        if (searchParams.get('parcelId')) {
            getABookedParcelById(searchParams.get('parcelId')).unwrap().then(({ parcel: parcelResponse }) => {
                console.log(35, parcelResponse);
                setParcel(parcelResponse);
            })

        }
    }, []);

    return (
        <div className="py-10">
            <div>
                {/* Parcel Tracking Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-semibold text-black-50">Track the Parcel</h1>
                    <p className="text-xl text-black-100">Now you can easily track the parcel</p>
                </div>

                {/* Parcel Tracking Form */}
                <form onSubmit={handleSubmit(handleSearch)} className="relative flex max-w-3xl mx-auto mt-12 rounded-l-lg border">
                    <input
                        {...register('parcelId', { required: 'Parcel ID is required' })}
                        type="text" className="outline-none py-3 md:py-5 pl-14 pr-5 w-full text-lg rounded-lg text-black-50" placeholder="Enter Parcel ID" />
                    <Icon icon="iconamoon:search-thin" className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl text-black-100" />
                    <button type="submit" className=" md:text-xl font-semibold gradient py-1 md:py-5 px-5 md:px-10 text-white rounded-r-lg">Search</button>
                </form>

                {
                    error && typeof error === 'object' && 'status' in error && error.status === 404
                    && <NotFoundData>Parcel Not Found</NotFoundData>
                }
                {
                    parcel && !error &&
                    <div className="mt-14  max-w-7xl mx-auto space-y-20">
                        {/* Shipment Details */}
                        <section className="max-w-6xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Package className="w-6 h-6 text-blue-600" />
                                Shipment Details
                            </h1>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 relative">
                                    {/* Divider line */}
                                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-4/5 bg-gray-200" />

                                    {/* Pickup Info */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <MapPin className="w-5 h-5" />
                                            <h2 className="text-xl font-semibold">Pickup Information</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <User className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Sender Name</p>
                                                    <p className="text-gray-800">{parcel.senderName}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Pickup Address</p>
                                                    <p className="text-gray-800">
                                                        {parcel.senderAddress.fullAddress}, {parcel.senderAddress.subDistrict}, {parcel.senderAddress.district}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                                                    <p className="text-gray-800">+880 {parcel.senderPhoneNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <MapPin className="w-5 h-5" />
                                            <h2 className="text-xl font-semibold">Delivery Information</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <User className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Recipient Name</p>
                                                    <p className="text-gray-800">{parcel.receiverName}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Delivery Address</p>
                                                    <p className="text-gray-800">
                                                        {parcel.deliveryAddress.fullAddress}, {parcel.deliveryAddress.subDistrict}, {parcel.deliveryAddress.district}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                                                    <p className="text-gray-800">+880 {parcel.receiverPhoneNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tracking Details */}
                        <section>
                            <h1 className="text-2xl mb-7 font-semibold text-black-50 text-center">Tracking Details</h1>

                            <div className=" rounded-xl">
                                <TrackingDetails parcel={parcel} />
                            </div>
                        </section>
                    </div>
                }
            </div>
        </div>
    );
};

export default ParcelTracking;