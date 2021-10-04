import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Modal
import DeleteConfirmation from '../../components/Modals/DeleteConfirmation';

function Single() {
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
    const [displayConfirmationModal, setDisplayConfirmationModal] = React.useState(false);
    const [deleteMessage, setDeleteMessage] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

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
                    notifyError(`API okay, Check Response`);
                    console.warn(message);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            });
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

    const axiosDelete = React.useCallback(async (id) => {
        try {
            const response = await axios.delete('https://api.retnecms.com/user/' + id);
            const { message } = response.data;
            notifySuccess(message);
            window.setTimeout(() => history.push('/admin/users/index'), 1500);
        } catch (error) {
            notifyError(`Check Your Network`);
            console.warn(error);
        }
    }, [history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGet();
        axiosGetId();
    }, [axiosGet, axiosGetId]);

    // Event Handlers
    const handleDelete = (id) => {
        axiosDelete(id);
        setDisplayConfirmationModal(false);
    };

    const showDeleteModal = (id) => {
        setDeleteId(id)
        setDeleteMessage(`Are you sure you want to delete ${id}?`);
        setDisplayConfirmationModal(true);
    };

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    // Custom
    let cd = new Date(user.createdAt);
    let ud = new Date(user.updatedAt);
    function getRoleName(x) {
        if (user.role_uuid === x.uuid) {
            return x.role
        }
    };

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">User</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/users/index">Users</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header">User Details</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table id="bs4-table" className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Password</th>
                                                    <th>Role</th>
                                                    <th>Created Date</th>
                                                    <th>Created Time</th>
                                                    <th>Updated Date</th>
                                                    <th>Updated Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.password}</td>
                                                    <td>{roles.map(getRoleName)}</td>
                                                    <td>{user.createdAt.slice(0, 10)}</td>
                                                    <td>{String(cd).slice(16, 24)}</td>
                                                    <td>{user.updatedAt.slice(0, 10)}</td>
                                                    <td>{String(ud).slice(16, 24)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="offset-sm-3">
                                                    <button onClick={() => showDeleteModal(user.uuid)} className="btn btn-danger btn-rounded">Delete</button>
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
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} id={deleteId} message={deleteMessage} />
        </main>
    )
};

export default Single;