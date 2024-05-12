import { Outlet } from "react-router-dom";
import Navbar from "./pages/Home/components/Navbar/Navbar";

const App = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;