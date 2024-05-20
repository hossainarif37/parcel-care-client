import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Sidebar />

            {/* Children */}
            <div className="flex-1 bg-primary">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;