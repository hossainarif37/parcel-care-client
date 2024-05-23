import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";
import useGetUser from "./hooks/useGetUser";


const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Get the current user
  useGetUser();


  return (
    <div>
      {!isAuthPage && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;