import {Route, Switch, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "./utils/consts";
import {useSelector} from "react-redux";

const AppRouter = () => {

    const token = useSelector(state => state.auth.token)
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