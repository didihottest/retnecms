import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Modal
import DeleteConfirmation from '../../components/Modals/DeleteConfirmation';

function Single() {
    // Hook: States
    const [role, setRole] = React.useState({
        role: '',
        createdAt: '',
        updatedAt: ''
    });
    const [displayConfirmationModal, setDisplayConfirmationModal] = React.useState(false);
    const [deleteMessage, setDeleteMessage] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

    // Router methods
    const { roleId } = useParams();
    const history = useHistory();

    // Function to Interact API
    const axiosGetId = React.useCallback(async() => {
        axios.get(`https://api.retnecms.com/role/${roleId}`)
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Get Id Role Successfully') {
                    console.table(data);
                    setRole(response.data.data);
                } else {
                    notifyError(`API okay, Check Response`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            });
    },[roleId]);

    const axiosDelete = React.useCallback(async(id) => {
        try {
            const response = await axios.delete('https://api.retnecms.com/role/' + id);
            const { message } = response.data;
            notifySuccess(message);
            window.setTimeout(() => history.push('/admin/roles/index'), 1500);
        } catch (error) {
            notifyError(`Check Your Network`);
            console.warn(error);
        }
    }, [history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGetId();
    }, [axiosGetId]);

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

    // Custom variables
    let cd = new Date(role.createdAt);
    let ud = new Date(role.updatedAt);

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Role</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/roles/index">Roles</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Single</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header">Role {role.role}</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table id="bs4-table" className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "40%" }}>Role</th>
                                                    <th>Created Date</th>
                                                    <th>Created Time</th>
                                                    <th>Updated Date</th>
                                                    <th>Updated Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><strong>{role.role}</strong></td>
                                                    <td>{role.createdAt.slice(0, 10)}</td>
                                                    <td>{String(cd).slice(16, 24)}</td>
                                                    <td>{role.updatedAt.slice(0, 10)}</td>
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
                                                    <button onClick={() => showDeleteModal(role.uuid)} className="btn btn-danger btn-rounded">Delete</button>
                                                    <button onClick={() => history.push('/admin/roles/index')} className="btn btn-secondary clear-form btn-rounded btn-outline">Back</button>
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