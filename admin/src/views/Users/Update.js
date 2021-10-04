import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Update() {
    // Hook: States
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
        createdAt: '',
        updatedAt: '',
        role_uuid: ''
    });
    const [roles, setRoles] = React.useState([]);

    // Router methods
    const { userId } = useParams();
    const history = useHistory();

    // Function to Interact API
    const axiosGet = React.useCallback(async () => {
        axios.get('https://api.retnecms.com/role')
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Successfully') {
                    console.table(data.rows);
                    setRoles(response.data.data.rows);
                } else {
                    alert(`API okay, Check Response`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            })
    }, []);

    const axiosGetId = React.useCallback(async () => {
        axios.get(`https://api.retnecms.com/user/${userId}`)
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Get Id User Successfully') {
                    console.table(data);
                    setUser(response.data.data);
                } else {
                    notifyError(`API okay, Check Response`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            });
    }, [userId]);

    const axiosPut = React.useCallback(async () => {
        try {
            const response = await axios.put(`https://api.retnecms.com/user/${userId}`, user);
            const { message } = response.data;
            if (message === 'User Successfully Updated') {
                notifySuccess(message)
                window.setTimeout(() => history.push('/admin/users/index'), 1500);
            } else {
                notifyError(`API okay, Check Response`)
                console.error(response);
            }
        } catch (error) {
            notifyError('Check Your Network');
            console.error(error);
        }
    }, [user, userId, history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGet();
        axiosGetId();
    }, [axiosGet, axiosGetId]);

    // Event Handlers
    const handleChange = (e, name) => {
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosPut();
    };

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Edit</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/users/index">Users</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Edit</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header">Edit User {user.username}</h5>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-body">
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Username</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.username} onChange={(e) => handleChange(e, 'username')} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Email</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.email} onChange={(e) => handleChange(e, 'email')} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Password</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={user.password} onChange={(e) => handleChange(e, 'password')} />
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
                            <div className="card-footer">
                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="offset-sm-3">
                                                    <button onClick={handleSubmit} className="btn btn-primary btn-rounded">Save</button>
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

export default Update;