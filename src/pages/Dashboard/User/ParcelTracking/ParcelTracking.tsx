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
                <form onSubmit={handleSubmit(handleSearch)} className="relative flex max-w-3xl mx-auto mt-12">
                    <input
                        {...register('parcelId', { required: 'Parcel ID is required' })}
                        type="text" className="outline-none py-5 pl-14 pr-5 w-full text-lg rounded-lg text-black-50" placeholder="Enter Parcel ID" />
                    <Icon icon="iconamoon:search-thin" className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl text-black-100" />
                    <button type="submit" className=" text-xl font-semibold gradient py-5 px-10 text-white rounded-r-lg">Search</button>
                </form>
            </div>
        </div>
    );
};

export default ParcelTracking;