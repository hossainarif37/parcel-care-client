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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackingData } from "@/constants/trackingData";
import { formateDate } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "@/components/Modal";
import { Link } from "react-router-dom";
import NotFoundData from "@/components/NotFoundData";

const MyPickupList = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { data, isLoading, error } = useGetAssignedParcelsByAgentIdQuery({ agentId: user?._id, assignedRole: 'pickup' });

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <NotFoundData>Parcel not found</NotFoundData>
    }
    console.log(data);
    console.log(error);
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
                            const remainingStatus = trackingData.filter(item =>
                                !parcel.shipmentStatusHistory.some(({ status }) => item.title.includes(status))
                            );
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
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={parcel.shipmentStatus} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        parcel.shipmentStatusHistory.map((item, i) => (
                                                            <SelectLabel
                                                                key={i}
                                                                className="flex gap-2 cursor-default"
                                                            >
                                                                <span className="text-green-500 mt-1 absolute left-2 text-lg">
                                                                    <Icon icon="teenyicons:tick-circle-solid" />
                                                                </span>
                                                                <div className="flex flex-col">
                                                                    <span className="">{item.status}</span>
                                                                    <span className="text-xs">{formateDate(item.updatedAt)}</span>
                                                                </div>
                                                            </SelectLabel>
                                                        ))
                                                    }
                                                    {
                                                        remainingStatus.length > 0 &&
                                                        remainingStatus.map((item, i) => {
                                                            console.log(99, item);
                                                            return (
                                                                i === 0 && item.title === 'Pickup Agent Assigned' ?
                                                                    <Modal
                                                                        key={i}
                                                                        parcelId={parcel._id}
                                                                        district={parcel.senderAddress.district}
                                                                        assigningAgentRole="Pickup"
                                                                    />
                                                                    :
                                                                    i === 0 && item.id !== 5 && item.id !== 6 && item.id !== 7 && item.id !== 8 ? (
                                                                        <SelectItem
                                                                            className="py-2 cursor-pointer"
                                                                            key={i} value={item.title}>
                                                                            {item.title}
                                                                        </SelectItem>
                                                                    ) : (
                                                                        <SelectLabel className={'cursor-not-allowed'} key={i}>
                                                                            {item.title}
                                                                        </SelectLabel>
                                                                    )
                                                            );
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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