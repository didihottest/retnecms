import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
// style for antd
import 'antd/dist/antd.css';

import Store from './redux/Store.js';

// Layouts
import Admin from './layouts/Admin';
import Auth from './layouts/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthRoutes from './components/PrivateRoute/AuthRoutes';
import authHeader from './services/auth-header.js';

let x = authHeader();
axios.defaults.headers.common['Authorization'] = x.Authorization;

axios.interceptors.request.use(request => {
    // Edit request config
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // Edit response config
    return response;
}, error => {
    return Promise.reject(error);
});

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/admin" component={Admin}></PrivateRoute>
                <AuthRoutes path="/auth/login" component={Auth}></AuthRoutes>
                <Redirect from="/" to="/admin/index" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);