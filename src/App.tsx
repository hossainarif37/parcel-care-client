import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import Cookies from "js-cookie";
import { useLazyCurrentUserQuery } from "./redux/api/endpoints/userApi";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./types/types";
import { setUser } from "./redux/slices/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { isAuthenticated } = useSelector((state: IRootState) => state.userSlice);

  const token = Cookies.get('authToken');

  const [getCurrentUser, { data: userData, isLoading, isError, error }] = useLazyCurrentUserQuery();


  // Inside your component
  const getCurrentUserMemoized = useCallback(getCurrentUser, [getCurrentUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      getCurrentUserMemoized(undefined);
    }
    if (userData?.success && token) {
      dispatch(setUser({ user: userData.user, isAuthenticated: true }));
    }

  }, [getCurrentUserMemoized, userData, token, isAuthenticated, dispatch]);

  return (
    <div className="max-w-[1920px] mx-auto">
      {!isAuthPage && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;