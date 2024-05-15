import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
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