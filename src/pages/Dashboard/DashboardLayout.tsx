import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative flex">
            <Sidebar />
            <main className="ml-72 flex-1 min-h-screen w-full bg-white-50 px-5 py-7">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;