import {ADMIN_ROUTE, CALL_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "./components/utils/consts";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Call from "./components/Call/Call";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CALL_ROUTE,
        Component: Call
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]