import { filteredTrackingData, formateDate } from "@/lib/utils";
import { IParcel } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
interface TrackingDetailsProps {
    parcel: IParcel;
}
const TrackingDetails: React.FC<TrackingDetailsProps> = ({ parcel }) => {
    const trackingData = filteredTrackingData(parcel);
    return (
        <div >
            {
                trackingData.map((item) => {
                    return (
                        <div key={item.id} className="flex items-center space-x-3">
                            <Icon className="text-[100px]" icon={item.icon} />
                            <div>
                                <h1 className="text-2xl font-semibold text-black-50">{item.title}</h1>
                                <p className="text-xl text-black-100">{item.description}</p>
                                <p>{formateDate(item.updatedAt, true)}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default TrackingDetails;