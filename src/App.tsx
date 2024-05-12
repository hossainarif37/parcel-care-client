import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;