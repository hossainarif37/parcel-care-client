import NotFoundData from "@/components/NotFoundData";
import { useLazyGetABookedParcelByIdQuery } from "@/redux/api/endpoints/parcelApi";
import { IParcel } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import TrackingDetails from "./TrackingDetails";

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
                    <h1 className="text-3xl font-semibold text-black-50">Track Your Parcel</h1>
                    <p className="text-xl text-black-100">Now you can easily track your parcel</p>
                </div>

                {/* Parcel Tracking Form */}
                <form onSubmit={handleSubmit(handleSearch)} className="relative flex max-w-3xl mx-auto mt-12 rounded-l-lg border">
                    <input
                        {...register('parcelId', { required: 'Parcel ID is required' })}
                        type="text" className="outline-none py-5 pl-14 pr-5 w-full text-lg rounded-lg text-black-50" placeholder="Enter Parcel ID" />
                    <Icon icon="iconamoon:search-thin" className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl text-black-100" />
                    <button type="submit" className=" text-xl font-semibold gradient py-5 px-10 text-white rounded-r-lg">Search</button>
                </form>

                {
                    error && typeof error === 'object' && 'status' in error && error.status === 404
                    && <NotFoundData>Parcel Not Found</NotFoundData>
                }
                {
                    parcel && !error &&
                    <div className="mt-14  max-w-7xl mx-auto space-y-10">
                        {/* Shipment Details */}
                        <section>
                            <h1 className="text-2xl mb-5 font-semibold text-black-50">Shipment Details</h1>
                            <div className="border flex justify-between p-10 rounded-xl">
                                {/* Pickup Info */}
                                <div className="w-1/2">
                                    <h2 className="text-xl font-semibold text-black-100">Pickup Info</h2>
                                    <div className="mt-5 space-y-1">
                                        <p><span className="font-semibold text-black-100">Sender Name:</span> {parcel?.senderName}</p>
                                        <p><span className="font-semibold text-black-100">Sender Address:</span> {parcel?.senderAddress?.fullAddress}, {parcel?.senderAddress?.subDistrict}, {parcel?.senderAddress?.district} </p>

                                        <p><span className="font-semibold text-black-100">Sender Phone:</span> +880{parcel?.senderPhoneNumber}</p>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div className="w-1/2">
                                    <h2 className="text-xl font-semibold text-right text-black-100">Delivery Info</h2>
                                    <div className="mt-5 space-y-1">
                                        <p><span className="font-semibold text-black-100">Recipient Name:</span> {parcel?.receiverName}</p>
                                        <p><span className="font-semibold text-black-100">Recipient Address:</span> {parcel?.deliveryAddress?.fullAddress}, {parcel?.deliveryAddress?.subDistrict}, {parcel?.deliveryAddress?.district}</p>

                                        <p><span className="font-semibold text-black-100">Recipient Phone:</span> +880{parcel?.receiverPhoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tracking Details */}
                        <section>
                            <h1 className="text-2xl mb-5 font-semibold text-black-50">Tracking Details</h1>

                            <div className="border rounded-xl">
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