import Loading from "@/components/Loading";
import { useGetAssignedParcelsByAgentIdQuery } from "@/redux/api/endpoints/parcelApi";
import { IRootState } from "@/types/types";
import { useSelector } from "react-redux";

const MyPickupList = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { data, isLoading, error } = useGetAssignedParcelsByAgentIdQuery({ agentId: user?._id, assignedRoles: 'pickup' });

    if (isLoading) {
        return <Loading paddingY="py-40" textColor="text-primary" textSize="text-4xl" />
    }

    console.log(error);

    console.log(data);
    return (
        <div>
            MyPickupList
        </div>
    );
};

export default MyPickupList;