import { Link, Outlet } from "react-router-dom";
import LoginRegisterTab from "./LoginRegisterTab";
import { Icon } from "@iconify/react/dist/iconify.js";


const AuthLayout = () => {
    return (
        <div>
            <Link to='/' className="absolute top-5 left-5 flex items-center gap-x-1 font-semibold text-black-100">
               <Icon icon="solar:alt-arrow-left-line-duotone" className="text-xl"/> Back to home
            </Link>
            <div className="my-20 md:my-40">
                <div className="w-full md:w-[500px] mx-auto rounded md:shadow-lg px-5 md:p-10">
                    <LoginRegisterTab />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;