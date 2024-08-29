import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../types/types";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AuthenticatedWrapper = ({ children }: { children: ReactNode }) => {
    const { user, userLoading } = useSelector((state: IRootState) => state.userSlice);
    const navigate = useNavigate();
    const isAgentUser = user?.role === 'agent';
    const isAdminUser = user?.role === 'admin';
    const isNormalUser = user?.role === 'user';

    useEffect(() => {
        if (user && !userLoading) {
            return navigate(`/`)
        }
    }, [isAdminUser, isAgentUser, isNormalUser, navigate, user, userLoading]);

    if (userLoading) {
        return <Loading />
    }
    if (!user && !userLoading) {
        return children;
    }
};

export default AuthenticatedWrapper;