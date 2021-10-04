import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LoginForm from '../components/Forms/LoginForm';
import authservice from '../services/auth-service';

import config from '../config';

function Auth() {
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e, name) => {
        const value = e.target.value
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        authservice.login(user.email, user.password)
            .then((response) => {
                notifySuccess(response.message)
                window.setTimeout(() => { window.location.assign(config.DOMAIN_NAME) }, 1500);
            })
            .catch((error) => notifyError(error))
    };

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    return (
        <>
            <LoginForm onChange={handleChange} onSubmit={handleSubmit} />
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Auth;