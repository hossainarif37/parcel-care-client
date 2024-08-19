import { filteredTrackingData, formateDate } from "@/lib/utils";
import { IParcel } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
interface TrackingDetailsProps {
    parcel: IParcel;
}
const TrackingDetails: React.FC<TrackingDetailsProps> = ({ parcel }) => {
    const [iconSize, setIconSize] = useState('70px');
    const trackingData = filteredTrackingData(parcel);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIconSize('40px');
            } else {
                setIconSize('70px');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <VerticalTimeline>
            {
                trackingData.map((item, i) => {
                    return (
                        <VerticalTimelineElement
                            key={i}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'linear-gradient(to right, #7D82FF, #0665DB)', color: '#fff', borderRadius: '10px' }}
                            contentArrowStyle={{ borderRight: `7px solid  ${i % 2 !== 0 ? '#7D82FF' : '#0665DB'}` }}
                            iconStyle={{ background: 'linear-gradient(to right, #7D82FF, #0665DB)', color: '#fff', width: iconSize, height: iconSize }}
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
    );
};

export default TrackingDetails;