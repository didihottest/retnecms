import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Create() {
    // Hooks: States
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
        jwt_token: '',
        createdAt: '',
        updatedAt: '',
        role_uuid: ''
    });
    const [roles, setRoles] = React.useState([]);

    // React-router methods
    const history = useHistory();

    // Functions to Interact with API
    const axiosGet = React.useCallback(async() => {
        axios.get('https://api.retnecms.com/role')
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Successfully') {
                    console.table(data.rows);
                    setRoles(response.data.data.rows);
                } else {
                    alert(`Your Server is okay, check your DB`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Server!`);
                console.error(error);
            })
    }, []);

    const axiosPost = React.useCallback(async() => {
        try {
            const response = await axios.post('https://api.retnecms.com/user', user)
            const { message } = response.data;
            if (message === 'User Successfully Created') {
                notifySuccess(message);
                window.setTimeout(() => history.push('/admin/users/index'), 1500);
            } else {
                notifyError(`API okay, Check Response`);
                console.warn(response);
            }
        } catch (error) {
            notifyError('Check Your Server!');
            console.error(error);
        }
    }, [user, history]);

    // Hook: useEffect to get roles data from api then attach it to state
    React.useEffect(() => {
        axiosGet();
    }, [axiosGet]);

    // Event Handlers
    const handleChange = (e, name) => {
        const value = e.target.value
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosPost();
    };

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    return (
        <main className="content content-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Users</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin/index"><i className="icon dripicons-home"></i></a></li>
                                <li className="breadcrumb-item"><a href="/admin/users/index">Users</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content content-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">

                            <h5 className="card-header">Create User</h5>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-body">
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Username</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.username} onChange={(e) => handleChange(e, 'username')} placeholder="Insert username" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Email</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.email} onChange={(e) => handleChange(e, 'email')} placeholder="Insert email" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Password</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.password} onChange={(e) => handleChange(e, 'password')} placeholder="Insert password" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Role</label>
                                            <div className="col-md-5">
                                                <select className="form-control" value={user.role_uuid} onChange={(e) => handleChange(e, 'role_uuid')}>
                                                    {roles && roles.map((role, index) => {
                                                        return (
                                                            <option key={index} value={role.uuid}>{role.role}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer bg-light">
                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="offset-sm-3">
                                                    <button onClick={handleSubmit} className="btn btn-primary btn-rounded">Add</button>
                                                    <button onClick={() => history.push('/admin/users/index')} className="btn btn-secondary clear-form btn-rounded btn-outline">Back</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </main>
    )
}

export default Create;