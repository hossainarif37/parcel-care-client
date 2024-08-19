import { useGetAllParcelsQuery } from "@/redux/api/endpoints/parcelApi";

const AllParcels = () => {
    const { data, isLoading, error } = useGetAllParcelsQuery(undefined);
    console.log(data);
    return (
        <div>
            AllParcels
        </div>
    );
};

export default AllParcels;