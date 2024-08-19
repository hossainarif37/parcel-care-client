import { useGetUsersByRoleQuery } from "@/redux/api/endpoints/userApi";
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
import { Link } from "react-router-dom";
import { UserType } from "@/types/types";
import NotFoundData from "@/components/NotFoundData";

const AllAgents = () => {
    const { data } = useGetUsersByRoleQuery('agent');

    if (!data) {
        return <NotFoundData>Agent not found</NotFoundData>
    }

    return (
        <div>
            <div className="h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-100 mb-5">Agents</h1>
                <Table className="">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Sub District</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Profile Completed</TableHead>
                            <TableHead>Full Address</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.agents?.map((agent: UserType) => (
                            <TableRow key={agent._id} className="text-black-50">
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell className="font-medium">{agent.email}</TableCell>
                                <TableCell className="font-medium">{agent.district}</TableCell>
                                <TableCell className="font-medium">{agent.subDistrict}</TableCell>
                                <TableCell className="font-medium">{agent.phoneNumber}</TableCell>
                                <TableCell className={`font-medium`}>
                                    <span className={`py-1 px-5 rounded-md  ${agent.isProfileComplete ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{agent.isProfileComplete?.toString()}</span>
                                </TableCell>
                                <TableCell className="font-medium">{agent.fullAddress}</TableCell>
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

export default AllAgents;