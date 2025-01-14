import { BarChart3, Globe, MapPin, Users } from 'lucide-react';
import { FC } from 'react';

const stats = [
    { icon: <MapPin />, value: "25000+", label: "Pin Codes" },
    { icon: <Users />, value: "50000+", label: "Customers" },
    { icon: <BarChart3 />, value: "99.9%", label: "Success Rate" },
    { icon: <Globe />, value: "150+", label: "Countries" }
];

const WhyChooseUs: FC = () => {
    return (
        < div className="gradient py-20" >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Why Choose ParcelCare?</h2>
                    <p className="text-xl text-blue-100">Experience the difference with our premium delivery service</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
                            <div className="mb-4">{stat.icon}</div>
                            <div className="text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-blue-100">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default WhyChooseUs;