import React from 'react';
import {
    Package, Users, TrendingUp, Truck,
    ArrowUpRight, ArrowDownRight,
    Package2, UserCheck, CircleDollarSign, MapPin
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const deliveryData = [
    { name: 'Mon', deliveries: 65 },
    { name: 'Tue', deliveries: 59 },
    { name: 'Wed', deliveries: 80 },
    { name: 'Thu', deliveries: 81 },
    { name: 'Fri', deliveries: 56 },
    { name: 'Sat', deliveries: 55 },
    { name: 'Sun', deliveries: 40 },
];

const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4600 },
    { name: 'May', revenue: 5400 },
    { name: 'Jun', revenue: 6800 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, bgColor }: {
    title: string;
    value: string;
    icon: React.ElementType;
    trend: 'up' | 'down';
    trendValue: string;
    bgColor: string;
}) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className={`${bgColor} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {trendValue}
                </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
    );
}

const Overview = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Parcels"
                        value="1,284"
                        icon={Package}
                        trend="up"
                        trendValue="12.5%"
                        bgColor="bg-blue-500"
                    />
                    <StatCard
                        title="Active Users"
                        value="892"
                        icon={Users}
                        trend="up"
                        trendValue="8.2%"
                        bgColor="bg-green-500"
                    />
                    <StatCard
                        title="Revenue"
                        value="$32,485"
                        icon={TrendingUp}
                        trend="up"
                        trendValue="15.3%"
                        bgColor="bg-purple-500"
                    />
                    <StatCard
                        title="Active Deliveries"
                        value="156"
                        icon={Truck}
                        trend="down"
                        trendValue="3.8%"
                        bgColor="bg-orange-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Delivery Performance Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Weekly Delivery Performance</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={deliveryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="deliveries" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Package2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Pending Deliveries</p>
                                <p className="text-xl font-semibold">45</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <UserCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Active Agents</p>
                                <p className="text-xl font-semibold">28</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <CircleDollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Today's Revenue</p>
                                <p className="text-xl font-semibold">$2,845</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <MapPin className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Delivery Hubs</p>
                                <p className="text-xl font-semibold">12</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;