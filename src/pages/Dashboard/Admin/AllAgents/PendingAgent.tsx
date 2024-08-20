import { useGetPendingAgentsQuery, useUpdatedAgentRequestStatusMutation } from "@/redux/api/endpoints/userApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom";
import { UserType } from "@/types/types";
import toast from "react-hot-toast";
import { baseApi } from "@/redux/api/baseApi";
import { useDispatch } from "react-redux";

const PendingAgent = () => {
    const { data } = useGetPendingAgentsQuery(undefined);
    const [updateAgentRequestStatus] = useUpdatedAgentRequestStatusMutation();
    const dispatch = useDispatch();
    const handleAgentRequestStatus = (value: string, userId: string) => {
        const updateResponse = updateAgentRequestStatus({ userId, body: { agentRequestStatus: value } }).unwrap();

        toast.promise(updateResponse, {
            loading: 'Loading',
            success: ({ message }) => {
                setTimeout(() => {
                    dispatch(baseApi.util.invalidateTags(['Pending Agent', 'Agent']));
                }, 1000);
                return message;
            },
            error: ({ data }) => {
                return data?.message || 'Update failed';
            },
        })
    };


    return (
        <div>
            <div className="mih-h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-100 mb-5">Pending Agents</h1>
                <Table className="">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Sub District</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Profile Completed</TableHead>
                            <TableHead>Agent Request Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.pendingAgents?.map((user: UserType) => (
                            <TableRow key={user._id} className="text-black-50">
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell className="font-medium">{user.district ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{user.subDistrict ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{user.phoneNumber ?? 'N/A'}</TableCell>
                                <TableCell className={`font-medium`}><span className={`py-1 px-5 rounded-md  ${user.isProfileComplete ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{user.isProfileComplete?.toString()}</span></TableCell>
                                <TableCell className="font-medium">
                                    <Select onValueChange={(value) => handleAgentRequestStatus(value, user._id)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={user.agentRequestStatus} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="accepted">Accept</SelectItem>
                                                <SelectItem value="rejected">Reject</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="font-medium text-center relative overflow-visible">

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="outline-none p-2 rounded-full border hover:bg-slate-50 text-xl">
                                                <Icon icon="tabler:dots" />
                                            </button>

                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="mt-1">
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/agent/parcel-tracking?parcelId=${user._id}`}>See more details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/agent/parcel-tracking?parcelId=${user._id}`}>See more details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/user/my-parcels/${user._id}/parcel-details`}>View & Edit Details</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PendingAgent;