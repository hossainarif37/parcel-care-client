import { useEffect } from "react";
import { useLazyCurrentUserQuery } from "../redux/api/endpoints/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user/userSlice";


const useGetUser = () => {
    const token = Cookies.get('authToken');
    const dispatch = useDispatch();


    const [getCurrentUser, { data: userData }] = useLazyCurrentUserQuery();

    useEffect(() => {
        getCurrentUser(undefined);

        if (token) {
            dispatch(setUser({ user: userData?.user, isAuthenticated: true }));
        }

    }, [userData?.user, dispatch, getCurrentUser, token]);

    return { userData }
}

export default useGetUser;