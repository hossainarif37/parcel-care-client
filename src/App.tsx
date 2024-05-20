import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import { useLazyCurrentUserQuery } from "./redux/api/endpoints/userApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [getCurrentUser, { data: userData }] = useLazyCurrentUserQuery();

  useEffect(() => {
    getCurrentUser(undefined);
    dispatch(setUser({ user: userData?.user, isAuthenticated: true }));

  }, [userData?.user, dispatch, getCurrentUser]);

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