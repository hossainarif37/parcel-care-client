import { Link, useLocation } from "react-router-dom";
import tabStyles from "./tab.module.css"


const LoginRegisterTab = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';


    return (
        <div>

            <div className="grid grid-cols-2 gap-2 relative">
                {/* Login */}

                <Link
                    to='/login'
                    className={`${tabStyles.tab} ${isLoginPage ? 'text-white hover:bg-secondary hover:text-white' : 'hover:bg-slate-100  hover:text-black-secondary'}`}>
                    Login
                </Link>

                {/* Register */}
                <Link
                    to='/register'
                    className={`${tabStyles.tab} ${isRegisterPage ? 'text-white hover:bg-secondary hover:text-white' : 'hover:bg-slate-100  hover:text-black-secondary'}`}>
                    Register
                </Link>

                <span className={`${tabStyles.activeTab} absolute  ${isRegisterPage ? `translate-x-full` : 'translate-x-0'}`}></span>
            </div>

        </div>
    );
};

export default LoginRegisterTab;