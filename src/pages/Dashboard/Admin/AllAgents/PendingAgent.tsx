import { useGetPendingAgentsQuery } from "@/redux/api/endpoints/userApi";
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserType } from "@/types/types";
import { Link } from "react-router-dom";

const PendingAgent = () => {
    const { data, isLoading, error } = useGetPendingAgentsQuery(undefined);
    console.log(data);
    return (
        <div>
            <div className="h-screen p-5 shadow-md rounded-xl">
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
                        {data?.pendingAgents?.map((agent: UserType) => (
                            <TableRow key={agent._id} className="text-black-50">
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell className="font-medium">{agent.email}</TableCell>
                                <TableCell className="font-medium">{agent.district ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{agent.subDistrict ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{agent.phoneNumber ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{agent.isProfileComplete?.toString()}</TableCell>
                                <TableCell className="font-medium">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="accepted">Accept</SelectItem>
                                                <SelectItem value="cancelled">Cancel</SelectItem>
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
                                                <Link to={`/dashboard/agent/parcel-tracking?parcelId=${agent._id}`}>See more details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/agent/parcel-tracking?parcelId=${agent._id}`}>See more details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/user/my-parcels/${agent._id}/parcel-details`}>View & Edit Details</Link>
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