import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";

const Logo = () => {
    const location = useLocation();
    const isDashboardPage = location.pathname.includes('/dashboard');
    return (
        <div>
            <Link to='/' className={`text-2xl md:text-${isDashboardPage ? 3 : 4}xl font-bold flex items-center gap-x-1`}>
                <div className="text-secondary text-3xl md:text-5xl">
                    <Icon icon="carbon:delivery-parcel" />
                </div>
                <div className="bg-clip-text bg-gradient-to-tr from-primary to-secondary text-transparent">
                    ParcelCare
                </div>
            </Link>
        </div>
    );
};

export default Logo;