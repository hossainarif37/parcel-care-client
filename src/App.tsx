import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import useGetUser from "./hooks/useGetUser";
import { useDispatch, useSelector } from "react-redux";
import { toggleDashboard, toggleNav, toggleProfileDropdown } from "./redux/slices/navbar/navbarSlice";
import { useEffect } from "react";
import { IRootState } from "./types/types";
import Loading from "./components/Loading";

const App = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes('/dashboard');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const dispatch = useDispatch();
  const {userLoading} = useSelector((state:IRootState)=>state.userSlice);

  // Get the current user
  useGetUser();

  useEffect(() => {
    !isDashboardPage && dispatch(toggleDashboard(false));
    dispatch(toggleProfileDropdown(false));
    dispatch(toggleNav(false));
  }, [dispatch, location, isDashboardPage])


  const handleProfileDropdown = () => {
    dispatch(toggleProfileDropdown(false));
  }

  if (userLoading) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen max-w-[1920px] mx-auto">
      {!isAuthPage && <Navbar />}
      <main onClick={handleProfileDropdown}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;