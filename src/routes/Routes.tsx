import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import AuthLayout from "../pages/Auth/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '',
                element: <AuthLayout />,
                children: [
                    {
                        path: '/login',
                        element: <Login />
                    },
                    {
                        path: '/register',
                        element: <Register />
                    }

                ]
            }
        ]
    },
]);
