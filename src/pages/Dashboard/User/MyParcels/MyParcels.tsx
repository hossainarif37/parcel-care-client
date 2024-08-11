import Loading from "@/components/Loading";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetBookingParcelsQuery } from "@/redux/api/endpoints/parcelApi";
import { IParcel, IRootState } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Button from "@/components/Buttons/Button";
import { formateDate } from "@/lib/utils";


const MyParcels = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { data, isLoading, isError, error } = useGetBookingParcelsQuery(user?._id);

    if (isLoading) {
        return <Loading paddingY="py-20" textColor="text-primary" textSize="4xl" />
    }

    return (
        <div>
            <div>
                <Table className="max-w-7xl mx-auto">
                    <TableCaption>Table</TableCaption>
                    <TableHeader>
                        <TableRow className="border-none">
                            <TableHead>Parcel ID</TableHead>
                            <TableHead>Sender Name</TableHead>
                            <TableHead>Receiver Name</TableHead>
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Delivery Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.parcels?.map((parcel: IParcel) => (
                            <TableRow key={parcel._id} className="border-none">
                                <TableCell className="font-medium">{parcel._id}</TableCell>
                                <TableCell className="font-medium">{parcel.senderName}</TableCell>
                                <TableCell className="font-medium">{parcel.receiverName}</TableCell>
                                <TableCell className="font-medium">{parcel.parcelType}</TableCell>
                                <TableCell className="font-medium">{parcel.price}</TableCell>
                                <TableCell className="font-medium">
                                    {formateDate(parcel.bookingDate, true)}
                                </TableCell>
                                <TableCell className="font-medium">{parcel.deliveryStatus}</TableCell>
                                <TableCell className="font-medium">{parcel.paymentStatus}</TableCell>
                                <TableCell className="font-medium text-center relative overflow-visible">

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="outline-none"><Icon icon="tabler:dots" /></button>

                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="mt-3">
                                            <DropdownMenuItem
                                                onClick={() => navigator.clipboard.writeText(parcel._id)}
                                            >
                                                Copy payment ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View customer</DropdownMenuItem>
                                            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
