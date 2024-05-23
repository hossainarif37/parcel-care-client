import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import useGetUser from "./hooks/useGetUser";
import { useDispatch } from "react-redux";
import { toggleProfileDropdown } from "./redux/slices/navbar/navbarSlice";


const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const dispatch = useDispatch();

  // Get the current user
  useGetUser();

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