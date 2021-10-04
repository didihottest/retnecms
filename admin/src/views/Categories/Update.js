import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useCategoriesUIContext } from '../../components/Context/CategoriesContext'
import { fetchCategory, updateCategory } from './_redux/categoriesAction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';

function Update() {

    // Hook: States

    const [category, setCategory] = React.useState({});

    // Router methods
    const { categoryId } = useParams();
    const history = useHistory();

    // get data from redux
    const { currentState } = useSelector(
        (state) => ({ currentState: state.categories }),
        shallowEqual
    )

    const { actionsLoading, categoryForEdit, error, listLoading } = currentState
    if (error) {
        toast.error(error)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategory(categoryId));
        setCategory(categoryForEdit)
    }, [dispatch]);

    // Function to Interact API
    // const axiosGetId = React.useCallback(async () => {
    //     axios.get(`https://api.retnecms.com/category/${categoryId}`)
    //         .then(response => {
    //             const { message, data } = response.data;
    //             if (message === 'Get Id Category Successfully') {
    //                 console.table(data);
    //                 setCategory(response.data.data);
    //             } else {
    //                 notifyError(`API okay, Check Response`);
    //                 console.warn(response);
    //             }
    //         })
    //         .catch(error => {
    //             notifyError(`Check Your Network`);
    //             console.error(error);
    //         });
    // }, [categoryId]);

    // const axiosPut = React.useCallback(async () => {
    //     try {
    //         const response = await axios.put(`https://api.retnecms.com/category/${categoryId}`, category);
    //         const { message } = response.data;
    //         if (message === 'Category Successfully Updated') {
    //             notifySuccess(message)
    //             window.setTimeout(() => history.push('/admin/categories/index'), 1500);
    //         } else {
    //             notifyError(`API okay, Check Response`)
    //             console.error(response);
    //         }
    //     } catch (error) {
    //         notifyError(`Check Your Network`);
    //         console.error(error);
    //     }
    // }, [category, categoryId, history]);

    // Hook: useEffect to get data then store to state
    // React.useEffect(() => {
    //     axiosGetId();
    // }, [axiosGetId]);





    // Event Handlers
    const handleChange = (e, name) => {
        const value = e.target.value;
        setCategory({ ...category, [name]: value })
    };

    const handleSubmit = async (category) => {
        // e.preventDefault()
        // axiosPut()
        dispatch(updateCategory(categoryId, category))
            .then(response => {
                console.log(response);
                const { message, data } = response;
                if (message) {
                    console.table(data);
                    toast.success(message)
                } else {
                    toast.error("Failed to Update");
                    console.warn(response);
                }
            })
    };

    // const notifySuccess = (msg) => toast.success(msg);
    // const notifyError = (msg) => toast.error(msg);

    // validation schema
    const categorySchema = Yup.object().shape({
        category_name: Yup.string()
            .min(2, 'Plaease Input Minimal 2 Character')
            .max(50, 'Plaease Input Maximal 50 Character')
            .required('Required'),
    });

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Edit</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/categories/index">Categories</Link></li>
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
                            <h5 className="card-header">Edit Category</h5>
                            <Formik
                                enableReinitialize={true}
                                initialValues={categoryForEdit}
                                validationSchema={categorySchema}
                                onSubmit={(values) => {
                                    handleSubmit(values);
                                }}>
                                {({ handleSubmit, values, handleBlur, setFieldValue }) => (
                                    <>
                                        <Form className="form form-label-right">
                                            <div className="form-group row mr-5 ml-2 mt-5">
                                                <div className="col-lg-12">
                                                    {
                                                        !listLoading ?
                                                            <>
                                                                <Field
                                                                    name="category_name"
                                                                    className="form-control"
                                                                    placeholder="Input Category Name"
                                                                    label="Category Name"
                                                                    onChange={(e) => {
                                                                        setFieldValue("category_name", e.target.value);
                                                                    }}
                                                                />
                                                                <ErrorMessage name='category_name'
                                                                    render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                                                            </> :
                                                            <tr>
                                                                <td className="text-center" colSpan="4" style={{ backgroundColor: "white" }}>
                                                                    <Spinner className="text-center" animation="border" variant="primary" />
                                                                </td>
                                                            </tr>
                                                    }

                                                </div>
                                                <button
                                                    type="submit"
                                                    onSubmit={() => handleSubmit()}
                                                    className="btn btn-primary btn-rounded mt-5 ml-3 mb-2 mr-2 float-left"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={() => history.push('/admin/categories/index')}
                                                    className=" btn btn-secondary clear-form btn-rounded btn-outline mt-5 ml-1 mb-2 mr-2 float-left"
                                                >
                                                    Back
                                                </button>
                                            </div>

                                        </Form>
                                    </>
                                )}
                            </Formik>
                            {/* <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-body">
                                        <div className="form-group row">
                                            <label className="control-label text-right col-md-3">Category Name</label>
                                            <div className="col-md-5">
                                                <input type="text" className="form-control" value={category ? category.category_name : ''} onChange={(e) => handleChange(e, 'category_name')} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                            {/* <div className="card-footer">
                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="offset-sm-3">
                                                    <button onClick={handleSubmit} className="btn btn-primary btn-rounded">Save</button>
                                                    <button onClick={() => history.push('/admin/categories/index')} className="btn btn-secondary clear-form btn-rounded btn-outline">Back</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </main>
    )
}

export default Update;