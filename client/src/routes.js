import {
    CALL_ROUTE, CALL_ROUTE_DETAIL, CALL_SUCCESS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    POLL_ROUTE,
    Templates_ROUTE, USERS_ROUTE
} from "./components/utils/consts";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Call from "./components/Call/Call";
import {Polls} from "./components/Polls/Polls";
import {Templates} from "./components/Templates/Template";
import CallForm from "./components/Call/CallForm";
import CallSuccess from "./components/Call/CallSuccess";
import Users from "./components/Users/Users";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        RBA: []
    },
    {
        path: Templates_ROUTE,
        Component: Templates,
        RBA: ['admin']
    },
    {
        path: POLL_ROUTE,
        Component: Polls,
        RBA: ['admin']
    },
    {
        path: USERS_ROUTE,
        Component: Users,
        RBA: ['admin']
    },
    {
        path: CALL_ROUTE,
        Component: Call,
        RBA: []
    },{
        path: CALL_SUCCESS_ROUTE,
        Component: CallSuccess,
        RBA: []
    },
    {
        path: CALL_ROUTE_DETAIL,
        Component: CallForm,
        RBA: []
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]