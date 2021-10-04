import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Modal
import DeleteConfirmation from '../../components/Modals/DeleteConfirmation';

function Single() {
    // Hook: States
    const [post, setPost] = React.useState({
        article_title: '',
        article_summary: '',
        article_content: '',
        image1_url: '',
        image2_url: '',
        status: '',
        user_uuid: '',
        category_uuid: ''
    });
    const [categories, setCategories] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = React.useState(false);
    const [deleteMessage, setDeleteMessage] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);

    // Router methods
    const { postId } = useParams();
    const history = useHistory();

    // Funtions to Interact with API
    const axiosGet = React.useCallback(async (endpoint, name) => {
        axios.get(endpoint)
            .then(response => {
                const { message, data } = response.data;
                if (message === `Get ${name} Successfully`) {
                    console.table(data.rows);
                    switch (name) {
                        case 'User':
                            setUsers(response.data.data.rows);
                            break;
                        case 'Category' :
                            setCategories(response.data.data.rows);
                            break;
                        default:
                            break;
                    }
                } else {
                    notifyError(`API okay, Check Response`);
                    console.warn(message);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            })
    }, []);

    const axiosGetId = React.useCallback(async () => {
        axios.get(`https://api.retnecms.com/news-article/${postId}`)
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Get Id News_Article Successfully') {
                    console.table(data);
                    setPost(response.data.data);
                } else {
                    notifyError(`API okay, Check Response`);
                    console.warn(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            });
    }, [postId]);

    const axiosDelete = React.useCallback(async (id) => {
        try {
            const response = await axios.delete('https://api.retnecms.com/news-article/' + id);
            const { message } = response.data;
            notifySuccess(message);
            window.setTimeout(() => history.push('/admin/posts/index'), 1500);
        } catch (error) {
            notifyError('Check Your Network');
            console.error(error);
        }
    }, [history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGet('https://api.retnecms.com/user', 'User');
        axiosGet('https://api.retnecms.com/category', 'Category');
        axiosGetId();
    }, [axiosGetId, axiosGet, postId]);

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

    function getCategoryName(x) {
        if (post.category_uuid === x.uuid) {
            return x.category_name
        }
    };
    function getUsername(x) {
        if (post.user_uuid === x.uuid) {
            return x.username
        }
    }

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Show Details</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/posts/index">Posts</Link></li>
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
                            <h5 className="card-header">View Details</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table id="bs4-table" className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Main Content</th>
                                                    <th>Category</th>
                                                    <th>Author</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{post.article_title}</td>
                                                    <td>{post.article_content}</td>
                                                    <td>{categories.map(getCategoryName)}</td>
                                                    <td>{users.map(getUsername)}</td>
                                                    {(post.status === 'publish') ? <td><span className="badge badge-success">{post.status}</span></td> : <td><span className="badge badge-secondary">{post.status}</span></td>}
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
                                                    <button onClick={() => showDeleteModal(post.uuid)} className="btn btn-danger btn-rounded">Delete</button>
                                                    <button onClick={() => history.push('/admin/posts/index')} className="btn btn-secondary clear-form btn-rounded btn-outline">Back</button>
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