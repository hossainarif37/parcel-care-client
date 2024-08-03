import { useEffect } from "react";
import { useLazyCurrentUserQuery } from "../redux/api/endpoints/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/slices/user/userSlice";

const useGetUser = () => {
    const token = Cookies.get('authToken');
    const dispatch = useDispatch();

    const [getCurrentUser] = useLazyCurrentUserQuery();

    useEffect(() => {
        if (token) {
            getCurrentUser(undefined)
                .unwrap()
                .then(userData => {
                    dispatch(setUser({ user: userData.user, isAuthenticated: true }));
                })
                .catch(error => {
                    console.error("Failed to fetch user:", error);
                    dispatch(setLoading());
                });
        }
    }, [dispatch, getCurrentUser, token]);

    return {};
}

export default useGetUser;