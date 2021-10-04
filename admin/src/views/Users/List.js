import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';

// Modal
import DeleteConfirmation from '../../components/Modals/DeleteConfirmation';

function List() {
    // Hook: States
    const [users, setUsers] = React.useState();
    const [displayConfirmationModal, setDisplayConfirmationModal] = React.useState(false);
    const [deleteMessage, setDeleteMessage] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // Router methods
    const history = useHistory();

    // Functions to Interact with API
    const axiosGet = React.useCallback(async () => {
        axios.get('https://api.retnecms.com/user')
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Get User Successfully') {
                    console.table(data.rows);
                    setUsers(response.data.data.rows);
                } else {
                    notifyError(`API okay, Check Response`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            })
    }, []);

    const axiosDelete = React.useCallback(async (id) => {
        try {
            const response = await axios.delete(`https://api.retnecms.com/user/${id}`);
            const { message } = response.data;
            notifySuccess(message);
            axiosGet();
        } catch (error) {
            notifyError('Check Your Network');
            console.error(error)
        }
    }, [axiosGet]);

    // Hook: useEffect to get all user then store it to state
    React.useEffect(() => {
        axiosGet();
        setLoading(true);
    }, [axiosGet]);

    // Event Handlers
    const handleDelete = (id) => {
        axiosDelete(id)
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

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Users</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/users/index">Users</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">List</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="page-content container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header">User List</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Link to="/admin/users/create" className="btn btn-primary btn-floating btn-rounded"><i className="icons dripicons-document-edit text-light"></i>Add User</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table id="bs4-table" className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "2.5%" }}>No.</th>
                                                    <th style={{ width: "57.5%" }}>Name</th>
                                                    <th>Created Date</th>
                                                    <th style={{ width: "15%", textAlign: "center" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(users && loading) ? users.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><strong><Link to={`/admin/users/single/${user.uuid}`}>{user.username}</Link></strong></td>
                                                            <td>{`${user.createdAt.slice(8, 10)}/${user.createdAt.slice(5,7)}/${user.createdAt.slice(0,4)}`}</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Edit</Tooltip>)} placement="top">
                                                                    <button className="btn btn-info btn-rounded btn-sm" onClick={() => history.push(`/admin/users/update/${user.uuid}`)}><i className="icons dripicons-pencil text-light"></i></button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Delete</Tooltip>)} placement="top">
                                                                    <button className="btn btn-danger btn-rounded btn-sm" onClick={() => showDeleteModal(user.uuid)}><i className="icons dripicons-trash text-light"></i></button>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr><td className="text-center" colSpan="4" style={{ backgroundColor: "white" }}><Spinner className="text-center" animation="border" variant="primary" /></td></tr>}
                                            </tbody>
                                        </table>
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
}

export default List;