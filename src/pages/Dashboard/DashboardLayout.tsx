import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative flex flex-row-reverse md:flex-row">
            <Sidebar />
            <main className="mr-72 md:ml-72 md:mr-0 flex-1 min-h-screen w-full bg-white-50 px-5 py-7">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;