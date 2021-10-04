import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { fetchCategories } from './_redux/categoriesAction';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useCategoriesUIContext } from '../../components/Context/CategoriesContext'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
    PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';
import Pagination from 'react-bootstrap/Pagination'
import CategoriesFilter from './CategoriesFilter/CategoriesFilter';

// Modal
import DeleteConfirmation from '../../components/Modals/DeleteConfirmation';

function List() {

    const categoriesUIContext = useCategoriesUIContext();
    const categoriesUIProps = useMemo(() => {
        return {
            queryParams: categoriesUIContext.queryParams,
            setQueryParams: categoriesUIContext.setQueryParams,
        };
    }, [categoriesUIContext]);
    // Hook: States
    const [categories, setCategories] = React.useState();
    const [displayConfirmationModal, setDisplayConfirmationModal] = React.useState(false);
    const [deleteMessage, setDeleteMessage] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [trigger, setTrigger] = useState(false)

    // Router methods
    const history = useHistory();

    // Function to Interact API
    const axiosGet = React.useCallback(async () => {
        axios.get('https://api.retnecms.com/category')
            .then(response => {
                const { message, data } = response.data;
                if (message === 'Get Category Successfully') {
                    console.table(data.rows);
                    setCategories(response.data.data.rows);
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
            axios.delete('https://api.retnecms.com/category/' + id).then(response => {
                const { message } = response.data;
                notifySuccess(message);
                dispatch(fetchCategories(categoriesUIProps.queryParams));
            })
        } catch (error) {
            notifyError(`Check Your Network`);
            console.error(error);
        }
    }, [axiosGet]);

    // Hook: useEffect to get all role user then store it to state
    React.useEffect(() => {
        axiosGet()
        setLoading(true);
    }, [axiosGet]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories(categoriesUIProps.queryParams));
    }, [dispatch, categoriesUIProps.queryParams, trigger]);

    const { currentState } = useSelector(
        (state) => ({ currentState: state.categories }),
        shallowEqual
    )

    const { listLoading,
        actionsLoading,
        totalCount,
        lastError,
        error, entities } = currentState

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

    const notifySuccess = (x) => toast.success(x);
    const notifyError = (y) => toast.error(y);

    const actionFormatter = (cell, row, rowIndex, formatExtraData) => {

        return (
            <>
                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Edit</Tooltip>)} placement="top">
                    <button className="btn btn-info btn-rounded btn-sm mr-md-2" onClick={() => history.push(`/admin/categories/update/${row.uuid}`)}><i className="icons dripicons-pencil text-light"></i></button>
                </OverlayTrigger>
                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Delete</Tooltip>)} placement="top">
                    <button className="btn btn-danger btn-rounded btn-sm" onClick={() => showDeleteModal(row.uuid)}><i className="icons dripicons-trash text-light"></i></button>
                </OverlayTrigger>
            </>
        )

    }

    const singleFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <strong>
                <Link
                    to={`/admin/categories/single/${row.uuid}`}>{row.category_name}
                </Link>
            </strong>
        )
    }
    const columns = [
        {
            dataField: 'category_name',
            text: 'Category Name',
            formatter: singleFormatter
        },
        {
            dateField: 'createdAt',
            text: "Created At",
            headerClasses: 'text-right',
            classes: 'text-right',
            formatter: (cell, row, rowIndex) => {
                return (new Date(row.createdAt).toLocaleDateString('id-ID'))
            }
        },
        {
            dataField: 'action',
            text: 'Actions',
            formatter: actionFormatter,
            headerClasses: 'text-right',
            classes: 'text-right',
            // style: 'text-right'
        },

    ];


    const paginationOptions = {
        custom: true,
        page: categoriesUIProps.queryParams.pageNumber,
        sizePerPageList: [
            {
                text: '10', value: 10
            },
            {
                text: '25', value: 25
            },
            {
                text: 'All', value: totalCount
            }
        ],
        showTotal: true,
        totalSize: totalCount
    };

    function handleTableAction(setQueryParams) {
        return (type, { page, sizePerPage, sortField, sortOrder, data }) => {
            const pageNumber = page || 1;
            setQueryParams(
                (prev) => {
                    if (type === 'sort') {
                        return { ...prev, sortOrder, sortField }
                    } else if (type === 'pagination') {
                        return { ...prev, pageNumber, pageSize: sizePerPage }
                    } else {
                        return prev
                    }
                }

            );
        };
    }

    return (
        <main className="content container-fluid">
            <header className="page-header">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h1 className="separator">Categories</h1>
                        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin/index"><i className="icon dripicons-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/admin/categories/index">Categories</Link></li>
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
                            <h5 className="card-header">Category List</h5>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-sm-12 mb-3 text-right">
                                        <Link to="/admin/categories/create" className="btn btn-primary btn-floating btn-rounded"><i className="icons dripicons-document-edit text-light"></i>Add Category</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">

                                    </div>
                                    <div className="col-sm-12">
                                        <div className="dataTables_filter">
                                            <CategoriesFilter />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {/* {(!listLoading) ? */}
                                        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                                            {({ paginationProps, paginationTableProps }) => {

                                                return (
                                                    <div>
                                                        {(!listLoading) ?
                                                            <div>
                                                                <BootstrapTable
                                                                    wrapperClasses="table-responsive"
                                                                    classes="table table-head-custom table-vertical-center overflow-hidden"
                                                                    bootstrap4
                                                                    bordered={false}
                                                                    remote
                                                                    keyField="uuid"
                                                                    data={!entities ? [] : entities}
                                                                    columns={columns}
                                                                    onTableChange={
                                                                        handleTableAction(
                                                                            categoriesUIProps.setQueryParams,
                                                                        )
                                                                    }
                                                                    {...paginationTableProps}
                                                                >
                                                                </BootstrapTable>
                                                                <div className="row">
                                                                    <div className="col-md-6 col-lg-6">
                                                                        <SizePerPageDropdownStandalone
                                                                            {...paginationProps}
                                                                        />
                                                                        <PaginationTotalStandalone
                                                                            {...paginationProps}

                                                                        />
                                                                    </div>
                                                                    <div className="col-md-6 col-lg-6 mt-2 mt-md-0 mt-lg-0 mt-sm-2">
                                                                        <PaginationListStandalone
                                                                            {...paginationProps}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            :
                                                            <div className="text-center" colSpan="4" style={{ backgroundColor: "white" }}>
                                                                <Spinner className="text-center" animation="border" variant="primary" />
                                                            </div>

                                                        }
                                                    </div>
                                                );
                                            }}
                                        </PaginationProvider>
                                        {/* : <tr><td className="text-center" colSpan="4" style={{ backgroundColor: "white" }}><Spinner className="text-center" animation="border" variant="primary" /></td></tr>} */}
                                        {/* <table id="bs4-table" className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "2.5%" }}>No.</th>
                                                    <th style={{ width: "57.5%" }}>Name</th>
                                                    <th>Created Date</th>
                                                    <th style={{ width: "13%", textAlign: "center" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(!listLoading && entities) ? entities.map((category, index) => {
                                                    let d = category.createdAt;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><strong><Link to={`/admin/categories/single/${category.uuid}`}>{category.category_name}</Link></strong></td>
                                                            <td>{d.slice(0, 10)}</td>
                                                            <td style={{ textAlign: "center" }}>
                                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Edit</Tooltip>)} placement="top">
                                                                    <button className="btn btn-info btn-rounded btn-sm" onClick={() => history.push(`/admin/categories/update/${category.uuid}`)}><i className="icons dripicons-pencil text-light"></i></button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>Delete</Tooltip>)} placement="top">
                                                                    <button className="btn btn-danger btn-rounded btn-sm" onClick={() => showDeleteModal(category.uuid)}><i className="icons dripicons-trash text-light"></i></button>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr><td className="text-center" colSpan="4" style={{ backgroundColor: "white" }}><Spinner className="text-center" animation="border" variant="primary" /></td></tr>}
                                            </tbody>
                                        </table> */}
                                        {/* <div>
                                            <Pagination>{items}</Pagination>
                                        </div> */}
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