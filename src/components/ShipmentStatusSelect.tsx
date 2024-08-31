import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formateDate } from "@/lib/utils";
import { useUpdateParcelInfoMutation } from "@/redux/api/endpoints/parcelApi";
import { IParcel, TShipmentStatus, TTrackingData } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import { trackingData } from "@/constants/trackingData";

const ShipmentStatusSelect = ({ parcel }: { parcel: IParcel }) => {
    const [updateShipmentStatus] = useUpdateParcelInfoMutation();
    const [selectedShipmentStatus, setSelectedShipmentStatus] = useState('');
    const [remainingStatus, setRemainingStatus] = useState<TTrackingData[]>([]);

    const handleUpdateShipmentStatus = (value: TShipmentStatus, parcelId: string) => {
        updateShipmentStatus({ parcelId, body: { shipmentStatus: value } }).unwrap()
            .then(() => {
                toast.success("Shipment status updated successfully");
                setSelectedShipmentStatus(value);
            })
            .catch((err) => {
                toast.error(err.data.message);
                console.log(err);
            });
    };

    useEffect(() => {
        const filteredRemainingStatus = trackingData.filter(item =>
            !parcel.shipmentStatusHistory.some(({ status }) => item.title.includes(status))
        );
        setRemainingStatus(filteredRemainingStatus);
    }, [parcel]);

    return (
        <div className="relative">
            {/* Select (Functional but Invisible) */}
            <Select onValueChange={(value: TShipmentStatus) => handleUpdateShipmentStatus(value, parcel._id)}>
                <SelectTrigger className={`w-[180px] ${selectedShipmentStatus ? 'opacity-0 absolute' : 'opacity-100 relative'} inset-0 z-10 pointer-events-auto`}>
                    <SelectValue placeholder={parcel.shipmentStatus || selectedShipmentStatus} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {parcel.shipmentStatusHistory.map((item, i) => (
                            <SelectLabel key={i} className="flex gap-2 cursor-default">
                                <span className="text-green-500 mt-1 absolute left-2 text-lg">
                                    <Icon icon="teenyicons:tick-circle-solid" />
                                </span>
                                <div className="flex flex-col">
                                    <span className="">{item.status}</span>
                                    <span className="text-xs">{formateDate(item.updatedAt)}</span>
                                </div>
                            </SelectLabel>
                        ))}
                        {remainingStatus.length > 0 &&
                            remainingStatus.map((item, i) => (
                                i === 0 && ((item.title === 'Pickup Agent Assigned') || (item.title === 'Delivery Agent Assigned')) ?
                                    <Modal
                                        key={i}
                                        parcelId={parcel._id}
                                        district={parcel.senderAddress.district}
                                        assigningAgentRole={`${item.title.includes('Pickup') ? 'Pickup' : 'Delivery'}`}
                                    />
                                    :
                                    i === 0 ? (
                                        <SelectItem
                                            className="py-2 cursor-pointer"
                                            key={i} value={item.title}>
                                            {item.title}
                                        </SelectItem>
                                    ) : (
                                        <SelectLabel className={`${i === 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`} key={i}>
                                            {item.title}
                                        </SelectLabel>
                                    )
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Select (Visible but Non-functional) */}
            {selectedShipmentStatus && <div className="relative z-0 pointer-events-none">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={selectedShipmentStatus} />
                    </SelectTrigger>
                </Select>
            </div>}
        </div>
    );
};

export default ShipmentStatusSelect;
