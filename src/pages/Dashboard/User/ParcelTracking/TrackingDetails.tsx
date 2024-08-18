import { filteredTrackingData, formateDate } from "@/lib/utils";
import { IParcel } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
interface TrackingDetailsProps {
    parcel: IParcel;
}
const TrackingDetails: React.FC<TrackingDetailsProps> = ({ parcel }) => {
    const trackingData = filteredTrackingData(parcel);
    return (
        <div >
            <VerticalTimeline>
                {
                    trackingData.map((item, i) => {
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'linear-gradient(to right, #7D82FF, #0665DB)', color: '#fff', borderRadius: '10px' }}
                                contentArrowStyle={{ borderRight: `7px solid  ${i % 2 !== 0 ? '#7D82FF' : '#0665DB'}` }}
                                iconStyle={{ background: 'linear-gradient(to right, #7D82FF, #0665DB)', color: '#fff', width: '70px', height: '70px' }}
                                icon={<Icon icon={item.icon} />}
                            >
                                <h3 className="vertical-timeline-element-title text-2xl font-bold">{item.title}</h3>
                                <p>
                                    {item.description}
                                </p>
                                <p>
                                    {formateDate(item.updatedAt)}
                                </p>
                            </VerticalTimelineElement>
                        );
                    })
                }
            </VerticalTimeline>
        </div>
    );
};

export default TrackingDetails;