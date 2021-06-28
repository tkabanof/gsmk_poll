import {Route, Switch, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "./utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../features/auth";

const AppRouter = () => {

    const dispatch = useDispatch()
    const tokenState = useSelector(state => state.auth.token)
    let token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(auth())
    }, [tokenState])
    

    const isAuth = !!token

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