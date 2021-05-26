import {Route, Switch, Redirect, useLocation} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "./utils/consts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {auth} from "../features/auth";

const AppRouter = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())
    }, [])

    //const token = useSelector(state => state.auth.token)
    const token = localStorage.getItem('token')
    const isAuth = !!token
    const path = useLocation()

    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {!isAuth && publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE}/>

        </Switch>
    )
}

export default AppRouter