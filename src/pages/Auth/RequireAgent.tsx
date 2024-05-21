import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../types/types";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const RequireAgent = ({ children }: { children: ReactNode }) => {
    const { user, isAuthenticated } = useSelector((state: IRootState) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location }, replace: true });
        } else if (user?.role !== 'agent') {
            toast.error("You don't have permission to navigate to this location");
            navigate('/');
        }
    }, [isAuthenticated, user, location, navigate]);

    if (!isAuthenticated) {
        return <Loading paddingY="py-20 md:py-40" textColor="text-primary" textSize="text-4xl" />
    }

    if (user?.role !== 'agent') {
        return <Loading paddingY="py-20 md:py-40" textColor="text-primary" textSize="text-4xl" />
    }

    return children;
};

export default RequireAgent;