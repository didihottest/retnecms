import React from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Update() {
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

    // Router methods
    const { postId } = useParams();
    const history = useHistory();

    // Functions to Interact with API
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
                        case 'Category':
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
                    console.error(response);
                }
            })
            .catch(error => {
                notifyError(`Check Your Network`);
                console.error(error);
            });
    }, [postId]);

    const axiosPut = React.useCallback(async () => {
        try {
            const response = await axios.put(`https://api.retnecms.com/news-article/${postId}`, post);
            const { message } = response.data;
            if (message === 'News_Article Successfully Updated') {
                notifySuccess(message)
                window.setTimeout(() => history.push('/admin/posts/index'), 1500);
            } else {
                notifyError(`API okay, Check Response`)
                console.error(response);
            }
        } catch (error) {
            notifyError('Check Your Network');
            console.error(error);
        }
    }, [post, postId, history]);

    // Hook: useEffect to get data then store to state
    React.useEffect(() => {
        axiosGetId();
        axiosGet('https://api.retnecms.com/user', 'User');
        axiosGet('https://api.retnecms.com/category', 'Category');
    }, [axiosGet, axiosGetId]);

    // Event Handlers
    const handleChange = (e, name) => {
        const value = e.target.value;
        setPost({ ...post, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosPut();
    };

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    return (
        <main className="content content-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Posts</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/posts/index">Posts</Link></li>
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

                            <h5 className="card-header">Create Post</h5>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-body">
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Category</label>
                                            <div className="col-md-7">
                                                <select className="form-control" value={post.category_uuid} onChange={(e) => handleChange(e, 'category_uuid')}>
                                                    <option value={null}>--- Select Category ---</option>
                                                    {categories && categories.map((category, index) => {
                                                        return (
                                                            <option key={index} value={category.uuid}>{category.category_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Title</label>
                                            <div className="col-md-7">
                                                <input type="text" className="form-control" value={post.article_title} onChange={(e) => handleChange(e, 'article_title')} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Meta Description</label>
                                            <div className="col-md-7">
                                                <textarea type="number" className="form-control" rows="5" value={post.article_summary} onChange={(e) => handleChange(e, 'article_summary')}>{post.article_summary}</textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Main Content</label>
                                            <div className="col-md-7">
                                                <textarea id="editor1" type="number" className="form-control" rows="15" value={post.article_content} onChange={(e) => handleChange(e, 'article_content')}>{post.article_content}</textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Status</label>
                                            <div className="col-md-7">
                                                <select className="form-control" value={post.status} onChange={(e) => handleChange(e, 'status')}>
                                                    <option value={null}>--- Select Status ---</option>
                                                    <option value="draft">Draft</option>
                                                    <option value="publish">Publish</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Writer</label>
                                            <div className="col-md-7">
                                                <select className="form-control" value={post.user_uuid} onChange={(e) => handleChange(e, 'user_uuid')}>
                                                    <option value={null}>--- Select Writer ---</option>
                                                    {users && users.map((user, index) => {
                                                        return (
                                                            <option key={index} value={user.uuid}>{user.username}</option>
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
                                                    <button onClick={handleSubmit} className="btn btn-primary btn-rounded">Save</button>
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
        </main>
    )
}

export default Update;