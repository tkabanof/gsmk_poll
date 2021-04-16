import {ADMIN_ROUTE, LOGIN_ROUTE} from "./components/utils/consts";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Comment: Admin
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }

]