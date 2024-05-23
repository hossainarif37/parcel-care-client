import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <div className="min-h-screen">
                <Sidebar />
            </div>

            {/* Children */}
            <div className="flex-1 min-h-screen bg-white-50">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;