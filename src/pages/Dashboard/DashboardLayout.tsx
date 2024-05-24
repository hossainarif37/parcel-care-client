import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardLayout = () => {
    return (
        <div className="relative flex">
            {/* Dashboard Toggle Button */}
            <button>
                <Icon icon="material-symbols-light:dashboard-customize-rounded" />
            </button>
            <Sidebar />
            <main className="mr-72 md:ml-72 md:mr-0 flex-1 min-h-screen w-full bg-white-50 px-5 py-7">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;