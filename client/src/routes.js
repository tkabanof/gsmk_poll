import {
    CALL_ROUTE, CALL_ROUTE_DETAIL, CALL_SUCCESS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    POLL_ROUTE,
    Templates_ROUTE
} from "./components/utils/consts";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Call from "./components/Call/Call";
import {Polls} from "./components/Polls/Polls";
import {Templates} from "./components/Templates/Template";
import CallForm from "./components/Call/CallForm";
import CallSuccess from "./components/Call/CallSuccess";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: Templates_ROUTE,
        Component: Templates
    },
    {
        path: POLL_ROUTE,
        Component: Polls
    },
    {
        path: CALL_ROUTE,
        Component: Call
    },{
        path: CALL_SUCCESS_ROUTE,
        Component: CallSuccess
    },
    {
        path: CALL_ROUTE_DETAIL,
        Component: CallForm
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]