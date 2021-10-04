import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function AuthRoutes({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => (
            !(localStorage.getItem("token") && localStorage.getItem("user"))
            ? <Component {...props} />
            : <Redirect to='/admin' />
        )} />
    )
};

export default AuthRoutes;
