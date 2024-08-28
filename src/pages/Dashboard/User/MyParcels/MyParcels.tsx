import Loading from "@/components/Loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetBookingParcelsByUserIdQuery } from "@/redux/api/endpoints/parcelApi";
import { IParcel, IRootState } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formateDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import NotFoundData from "@/components/NotFoundData";
import { useEffect } from "react";


const MyParcels = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { data, isLoading } = useGetBookingParcelsByUserIdQuery(user?._id);

    if (isLoading) {
        return <Loading paddingY="py-20" textColor="text-primary" textSize="4xl" />
    }

    if (!data) {
        return <NotFoundData>Parcel not found</NotFoundData>
    }


    return (
        <div>
            <div className="min-h-screen p-5 shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-black-50 mb-5">My Parcels</h1>
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
                        {data?.parcels?.map((parcel: IParcel) => (
                            <TableRow key={parcel._id} className="text-black-50">
                                <TableCell className="font-medium">{parcel._id}</TableCell>
                                <TableCell className="font-medium">{parcel.senderName}</TableCell>
                                <TableCell className="font-medium">{parcel.receiverName}</TableCell>
                                <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                                <TableCell className="font-medium">{parcel.price}</TableCell>
                                <TableCell className="font-medium">
                                    {formateDate(parcel.bookingDate, true)}
                                </TableCell>
                                <TableCell className="font-medium">{parcel.shipmentStatus}</TableCell>
                                <TableCell className={"font-medium"}><span className={`${parcel.paymentStatus === 'Unpaid' ? 'text-red-500 bg-red-100' : 'text-green-600 bg-green-100'} font-semibold py-1 px-3 rounded-full`}>{parcel.paymentStatus}</span></TableCell>
                                <TableCell className="font-medium text-center relative overflow-visible">

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="outline-none p-2 rounded-full border hover:bg-slate-50 text-xl">
                                                <Icon icon="tabler:dots" />
                                            </button>

                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="mt-1">
                                            <DropdownMenuItem>
                                                {
                                                    parcel.paymentStatus === 'Unpaid' ?
                                                        (<Link
                                                            state={{
                                                                senderId: parcel.senderId,
                                                                parcelId: parcel._id,
                                                                senderName: parcel.senderName,
                                                                senderEmail: parcel.senderEmail,
                                                                price: parcel.price,
                                                                parcelType: parcel.parcelType
                                                            }}
                                                            to={`/dashboard/user/my-parcels/${parcel._id}/payment`}>Proceed to Payment</Link>)
                                                        :
                                                        (<Link to={`/dashboard/user/my-parcels/${parcel._id}/transaction-details`}>View Transaction Details</Link>)
                                                }
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/user/parcel-tracking?parcelId=${parcel._id}`}>Track Your Parcel</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link to={`/dashboard/user/my-parcels/${parcel._id}/parcel-details`}>View & Edit Details</Link>
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

export default MyParcels;
