import { Outlet } from "react-router-dom";
import LoginRegisterTab from "./LoginRegisterTab";


const AuthLayout = () => {
    return (
        <div>
            <div className="my-20 md:my-40">
                <div className="w-full md:w-[450px] mx-auto rounded md:shadow-lg px-5 md:p-10">

                    <LoginRegisterTab />

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;