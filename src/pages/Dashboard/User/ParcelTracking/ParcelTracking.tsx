import NotFoundData from "@/components/NotFoundData";
import { useLazyGetABookedParcelByIdQuery } from "@/redux/api/endpoints/parcelApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";

interface IFormInput {
    parcelId: string
}

const ParcelTracking = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [getABookedParcelById, { data, error }] = useLazyGetABookedParcelByIdQuery();
    const handleSearch = (data: IFormInput) => {
        getABookedParcelById(data.parcelId).unwrap();
    }

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
                    data &&
                    <section className="mt-14  max-w-7xl mx-auto">
                        <h1 className="text-3xl mb-5 font-semibold text-black-100">Shipment Details</h1>
                        <div className="border flex justify-between p-10 rounded-xl">
                            {/* Pickup Info */}
                            <div>
                                <h2 className="text-2xl font-semibold text-black-100">Pickup Info</h2>
                                <div className="mt-5 space-y-1">
                                    <p><span className="font-semibold text-black-100">Sender Name:</span> {data?.parcel?.senderName}</p>
                                    <p><span className="font-semibold text-black-100">Sender Address:</span> {data?.parcel?.senderAddress?.fullAddress}</p>

                                    <p>Sender Phone: {data?.parcel?.senderPhoneNumber}</p>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div>
                                <h2 className="text-2xl font-semibold text-right text-black-100">Delivery Info</h2>
                                <div className="mt-5 space-y-1">
                                    <p><span className="font-semibold text-black-100">Recipient Name:</span> {data?.parcel?.receiverName}</p>
                                    <p><span className="font-semibold text-black-100">Recipient Address:</span> {data?.parcel?.deliveryAddress?.fullAddress}, {data?.parcel?.deliveryAddress?.subDistrict}, {data?.parcel?.deliveryAddress?.district}</p>

                                    <p>Recipient Phone: {data?.parcel?.receiverPhoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </div>
    );
};

export default ParcelTracking;