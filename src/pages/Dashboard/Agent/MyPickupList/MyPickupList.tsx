import Loading from "@/components/Loading";
import { useGetAssignedParcelsByAgentIdQuery } from "@/redux/api/endpoints/parcelApi";
import { IParcel, IRootState } from "@/types/types";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formateDate } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import NotFoundData from "@/components/NotFoundData";
import ShipmentStatusSelect from "../../components/ShipmentStatusSelect";

const MyPickupList = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { data, isLoading } = useGetAssignedParcelsByAgentIdQuery({ agentId: user?._id, assignedRole: 'pickup' });

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <NotFoundData>Parcel not found</NotFoundData>
    }

    return (
        <div>
            <div className="min-h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-50 mb-5">Pickup List</h1>
                <Table className="">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>Parcel ID</TableHead>
                            <TableHead>Sender Name</TableHead>
                            <TableHead>Receiver Name</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Shipment Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.parcels?.map((parcel: IParcel) => {
                            return (
                                <TableRow key={parcel._id} className="text-black-50">
                                    <TableCell className="font-medium">{parcel._id}</TableCell>
                                    <TableCell className="font-medium">{parcel.senderName}</TableCell>
                                    <TableCell className="font-medium">{parcel.receiverName}</TableCell>
                                    <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                                    <TableCell className="font-medium">{parcel.price}</TableCell>
                                    <TableCell className="font-medium">
                                        {formateDate(parcel.bookingDate, true)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <ShipmentStatusSelect parcel={parcel} />
                                    </TableCell>
                                    <TableCell className={"font-medium"}><span className={`${parcel.paymentStatus === 'Unpaid' ? 'text-red-500 bg-red-100' : 'text-green-600 bg-green-100'} font-semibold py-1 px-3 rounded-full`}>{parcel.paymentStatus}</span></TableCell>
                                    <TableCell className="font-medium text-center relative overflow-visible">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="outline-none p-2 rounded-full border hover:bg-slate-50 text-xl">
                                                    <Icon icon="tabler:dots" />
                                                </button>

                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="mt-1">
                                                <DropdownMenuItem>
                                                    <Link to={`/dashboard/agent/parcel-tracking?parcelId=${parcel._id}`}>Track the Parcel</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link to={`#`}>View Details</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyPickupList;