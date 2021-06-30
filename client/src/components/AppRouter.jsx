import {Route, Switch, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "./utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../features/auth";
import jwt_decode from "jwt-decode";

const AppRouter = () => {

    const dispatch = useDispatch()
    const tokenState = useSelector(state => state.auth.token)
    //let token = localStorage.getItem('token')

    const role = useSelector(state => state.auth.role)

    useEffect(() => {
        dispatch(auth())
    }, [])
    

    const isAuth = !!tokenState

    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component, RBA}) => {
                if (RBA.includes(role) || RBA.length === 0) return <Route key={path} path={path} component={Component} exact/>
            }

            )}
            {!isAuth && publicRoutes.map(({path, Component, RBA}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE}/>

        </Switch>
    )
}

export default AppRouter