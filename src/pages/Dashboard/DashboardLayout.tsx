import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, TErrorData } from "../../types/types";
import { toggleDashboard } from "../../redux/slices/navbar/navbarSlice";
import { useResubmitAgentRequestMutation } from "@/redux/api/endpoints/userApi";
import dashboardLayoutStyles from './dashboardLayout.module.css';
import toast from "react-hot-toast";
import { updateUser } from "@/redux/slices/user/userSlice";

const DashboardLayout = () => {
    const { isDashboardToggle } = useSelector((state: IRootState) => state.navbarSlice);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const [resubmitAgentRequest] = useResubmitAgentRequestMutation();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleDashboardToggle = () => {
        dispatch(toggleDashboard());
    }

    const handleResubmitRequest = () => {
        resubmitAgentRequest({ userId: user?._id, body: { agentRequestStatus: 'pending' } }).unwrap()
            .then(res => {
                console.log('Request for another review update:', res);
                toast.success(res.message);
                dispatch(updateUser({ user: res.user }));
            }).catch((err: TErrorData) => {
                console.log(err);
                toast.error(err.data.message)
            })
    }

    return (
        <div className="relative flex">
            <aside className={`${isDashboardToggle ? 'translate-x-0' : '-translate-x-80'} md:translate-x-0 duration-300 z-10 h-screen fixed md:sticky inset-y-0 left-0 md:min-w-60 flex flex-col border-r py-5 px-7 bg-white-50 border-white-100`}>
                <Sidebar />
            </aside>

            {/* Children */}
            <main className="flex-1 min-h-screen w-full bg-white ">
                {
                    (user?.agentRequestStatus === 'pending' && !user.isProfileComplete) &&
                    <p className="bg-red-400 py-1 text-white text-center">
                        Your agent request is pending due to incomplete profile. Complete all fields to enable review processing.
                    </p>
                }
                {
                    (user?.agentRequestStatus === 'pending' && user.isProfileComplete) &&
                    <p className="bg-blue-400 py-1 text-white text-center">
                        Your agent request is under review for admin approval.
                    </p>
                }
                {
                    (user?.agentRequestStatus === 'rejected' && user.isProfileComplete) && <p className="bg-red-400 py-1 flex items-center justify-center text-white text-center">
                        Your agent request has been rejected.
                        <button
                            onClick={handleResubmitRequest}
                            className={`flex items-center underline active:scale-95 overflow-hidden rounded-lg ml-2 ${dashboardLayoutStyles.resubmitBtn}`}
                        >
                            Request for Another Review <Icon className="text-xl" icon="solar:arrow-right-linear" />
                        </button>
                    </p>
                }
                <div className="px-7 py-7 -z-10">
                    {/* Dashboard Toggle Button */}
                    <div className="block md:hidden">
                        <button className="text-black-50 text-4xl" onClick={handleDashboardToggle}>
                            <Icon icon="bx:menu-alt-left" />
                        </button>

                        <hr className="my-2" />
                    </div>

                    {
                        (user?.agentRequestStatus === 'pending' || user?.agentRequestStatus === 'rejected') && pathname !== '/dashboard/agent/profile'
                            ?
                            <h1 className="text-red-400 text-xl text-center mt-10">
                                You don't have permission to navigate to this location!
                            </h1>
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