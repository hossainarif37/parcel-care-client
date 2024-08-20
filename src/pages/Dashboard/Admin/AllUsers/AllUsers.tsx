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
import { useGetUsersByRoleQuery } from "@/redux/api/endpoints/userApi";
import NotFoundData from "@/components/NotFoundData";
const AllUsers = () => {
    const { data } = useGetUsersByRoleQuery('user');

    console.log(data);

    if (!data) {
        return <NotFoundData>Users not found</NotFoundData>
    }
    return (
        <div>
            <div className="min-h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-100 mb-5">Users</h1>
                <Table className="">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Sub District</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Profile Completed</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.users?.map((user: UserType) => (
                            <TableRow key={user._id} className="text-black-50">
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell className="font-medium">{user.district ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{user.subDistrict ?? 'N/A'}</TableCell>
                                <TableCell className="font-medium">{user.phoneNumber ?? 'N/A'}</TableCell>
                                <TableCell className={`font-medium`}><span className={`py-1 px-5 rounded-md  ${user.isProfileComplete ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{user.isProfileComplete?.toString()}</span></TableCell>

                                <TableCell className="font-medium text-right relative overflow-visible">

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="outline-none p-2 rounded-full border hover:bg-slate-50 text-xl">
                                                <Icon icon="tabler:dots" />
                                            </button>

                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="mt-1">
                                            <DropdownMenuItem>
                                                <Link to={`#`}>See more details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to={`#`}>View & Edit Details</Link>
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

export default AllUsers;