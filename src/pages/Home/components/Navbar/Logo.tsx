import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";

const Logo = () => {
    const location = useLocation();
    const isDashboardPage = location.pathname.includes('/dashboard');
    return (
        <div>
            <Link to='/' className={`text-2xl md:text-${isDashboardPage ? 3 : 4}xl font-bold flex items-center gap-x-1`}>
                <div className="text-secondary text-3xl md:text-5xl">
                    <Icon icon="hugeicons:delivery-truck-02" />
                </div>
                <div>
                    <span className="text-primary">Parcel</span><span className="text-secondary">Care</span>
                </div>
            </Link>
        </div>
    );
};

export default Logo;