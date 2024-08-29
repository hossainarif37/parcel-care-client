import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../types/types";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { user, isAuthenticated, userLoading } = useSelector((state: IRootState) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !userLoading) {
            navigate("/login", { state: { from: location }, replace: true });
        } else if (!userLoading && user && user?.role !== 'user') {
            toast.error("You don't have permission to navigate to this location");
            navigate('/');
        }
    }, [isAuthenticated, user, location, navigate, userLoading]);

    if (userLoading) {
        return <Loading />
    }
    if (user?.role === 'user') {
        return children;
    }
};

export default RequireAuth;