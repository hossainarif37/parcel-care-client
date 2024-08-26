import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types/types";
import { toggleDashboard } from "../../redux/slices/navbar/navbarSlice";

const DashboardLayout = () => {
    const { isDashboardToggle } = useSelector((state: IRootState) => state.navbarSlice);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleDashboardToggle = () => {
        dispatch(toggleDashboard());
    }

    return (
        <div className="relative flex">
            <div className={`${isDashboardToggle ? 'translate-x-0' : '-translate-x-80'} md:translate-x-0 duration-300 z-10`}>
                <Sidebar />
            </div>

            {/* Children */}
            <main className="flex-1 min-h-screen w-full bg-white ">
                {
                    (user?.agentRequestStatus === 'pending' && !user.isProfileComplete) &&
                    <p className="bg-red-400 py-1 text-white text-center">Your agent request is pending due to incomplete profile. Complete all fields to enable review processing.</p>
                }
                {
                    (user?.agentRequestStatus === 'pending' && user.isProfileComplete) &&
                    <p className="bg-blue-400 py-1 text-white text-center">Your agent request is under review for admin approval.</p>
                }
                <div className="px-7 py-7">
                    {/* Dashboard Toggle Button */}
                    <div className="block md:hidden">
                        <button className="text-black-50 text-4xl" onClick={handleDashboardToggle}>
                            <Icon icon="bx:menu-alt-left" />
                        </button>

                        <hr className="my-2" />
                    </div>

                    {
                        user?.agentRequestStatus === 'pending' && pathname !== '/dashboard/agent/profile' ? <h1 className="text-red-400 text-xl text-center mt-10">You don't have permission to navigate to this location!</h1>
                            :
                            <Outlet />
                    }
                </div>
            </main>

            {/* Overlay */}
            {isDashboardToggle && <div
                onClick={() => dispatch(toggleDashboard(false))}
                className={`absolute bg-opacity-50 backdrop-blur-sm w-full h-full top-0 transition-opacity duration-500 ease-in-out`}
            ></div>}
        </div>
    );
};

export default DashboardLayout;