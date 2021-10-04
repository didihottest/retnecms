import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Update() {
    // Hook: State
    const [role, setRole] = React.useState({
        role: ''
    });

    // Router methods
    const { roleId } = useParams();
    const history = useHistory();

    // Function to Interact API
    const axiosGetId = React.useCallback(() => {
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
    }, [roleId]);

    const axiosPut = React.useCallback(async() => {
        try {
            const response = await axios.put(`https://api.retnecms.com/role/${roleId}`, role);
            const { message } = response.data;
            if (message === 'Role Successfully Updated') {
                notifySuccess(message)
                window.setTimeout(() => history.push('/admin/roles/index'), 1500);
            } else {
                notifyError(`API okay, Check Response`)
                console.error(response);
            }
        } catch (error) {
            notifyError(`Check Your Network`);
            console.error(error);
        }
    }, [role, roleId, history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGetId();
    }, [axiosGetId]);

    // Event Handlers
    const handleChange = (e, name) => {
        const value = e.target.value;
        setRole({...role, [name]: value })
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
                                <li className="breadcrumb-item"><Link to="/admin/roles/index">Roles</Link></li>
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
                            <h5 className="card-header">Edit Role</h5>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-body">
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Role Name</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={role.role} onChange={(e) => handleChange(e, 'role')} />
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
        </main>
    )
}

export default Update;