import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link to='/' className={cn(`text-2xl xl:text-4xl font-bold flex items-center gap-x-1`, className)}>
            <div className="text-secondary text-3xl md:text-4xl xl:text-5xl">
                <Icon icon="carbon:delivery-parcel" />
            </div>
            <div className="bg-clip-text bg-gradient-to-tr from-primary to-secondary text-transparent">
                ParcelCare
            </div>
        </Link>
    );
};

export default Logo;