import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import useGetUser from "./hooks/useGetUser";
import { useDispatch } from "react-redux";
import { toggleDashboard, toggleNav, toggleProfileDropdown } from "./redux/slices/navbar/navbarSlice";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes('/dashboard');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const dispatch = useDispatch();

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


  return (
    <div>
      {!isAuthPage && <Navbar />}
      <main
        onClick={handleProfileDropdown}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default App;