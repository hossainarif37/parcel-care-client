import { useGetUsersByRoleQuery } from "@/redux/api/endpoints/userApi";

const AllAgents = () => {
    const { data, isLoading, error } = useGetUsersByRoleQuery('agent');
    console.log(data);
    return (
        <div>
            AllAgents
        </div>
    );
};

export default AllAgents;