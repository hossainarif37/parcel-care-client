import { useEffect, useState } from "react";
import { useLazyCurrentUserQuery } from "../redux/api/endpoints/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoading, setUser, removeUser } from "../redux/slices/user/userSlice";

const useGetUser = () => {
    const dispatch = useDispatch();
    const [getCurrentUser] = useLazyCurrentUserQuery();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            dispatch(setLoading(true));

            const checkTokenAndFetchUser = async () => {
                const token = Cookies.get('authToken');

                if (token) {
                    try {
                        const userData = await getCurrentUser(undefined).unwrap();
                        dispatch(setUser({ user: userData.user, isAuthenticated: true }));
                    } catch (error) {
                        console.error("Failed to fetch user:", error);
                        dispatch(removeUser());
                    }
                } else {
                    dispatch(removeUser()); // Reset user state when no token
                }
                // After token check or fetch attempt, end initial loading
                setInitialLoad(false);
                dispatch(setLoading(false));
            };

            checkTokenAndFetchUser();
        }
    }, [initialLoad, dispatch, getCurrentUser]);

    return {};
};

export default useGetUser;
