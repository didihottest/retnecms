import { NavLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useMemo, useState } from 'react';
import config from '../../config';

function SideBar() {
    const { currentState } = useSelector(
        (state) => ({ currentState: state.whois }),
        shallowEqual
    )
    const { currentUser } = currentState

    const [user, setUser] = useState([])

    useEffect(() => {
        setUser(currentUser)
    }, [currentUser])

    const categoryAllow = ['superadmin', 'editor']
    const usersAllow = ['superadmin']
    const postsAllow = ['superadmin', 'writer', 'editor']
    return (
        <aside className="sidebar sidebar-left">
            <div className="sidebar-content">
                <nav className="main-menu">
                    <ul className="nav metismenu">

                        <li className="sidebar-header"><span>NAVIGATION</span></li>

                        <li>
                            <NavLink to="/admin/index"><i className="icon dripicons-meter"></i><span>Dashboard</span></NavLink>
                        </li>

                        <li>
                            {/* <NavLink to={config.FE_DOMAIN} target="_blank"><i className="icon dripicons-preview"></i><span className="mr-3">Preview Site</span><i className="ml-5 la la-external-link"></i></NavLink> */}
                        </li>
                        {
                            user && user.role && user.role.role && postsAllow.includes(user.role.role) && (
                                <li>
                                    <NavLink to="/admin/posts/index"><i className="icon dripicons-document-edit"></i><span>Posts List</span></NavLink>
                                </li>
                            )
                        }

                        {/* <li className="nav-dropdown">
                            <NavLink to="/admin/posts/index" className="has-arrow"><i className="icon dripicons-document-edit"></i><span>Posts</span></NavLink>
                            <ul className="collapse nav-sub">
                                
                                <li><NavLink to="/admin/posts/draft"><span>Draft</span></NavLink></li>
                                <li><NavLink to="/admin/posts/published"><span>Published</span></NavLink></li>
                            </ul>
                        </li> */}

                        {
                            user && user.role && user.role.role && categoryAllow.includes(user.role.role) &&
                            <li>
                                <NavLink to="/admin/categories/index"><i className="icon dripicons-tags"></i><span>Categories</span></NavLink>
                            </li>
                        }


                        {/* <li className="nav-dropdown">
                            <NavLink to="/admin/users/index" className="has-arrow"><i className="icon dripicons-user-group"></i><span>Users</span></NavLink>
                            <ul className="collapse nav-sub">

                                <li><NavLink to="/admin/users/index"><i className="icon dripicons-user-group"></i><span>List</span></NavLink></li>
                                <li><NavLink to="/admin/roles/index"><i className="icon dripicons-user-group"></i><span>Roles</span></NavLink></li>
                            </ul>

                        </li> */}
                        {
                            user && user.role && user.role.role && usersAllow.includes(user.role.role) &&
                            <>
                                <li><NavLink to="/admin/users/index"><i className="icon dripicons-user-group"></i><span>Users List</span></NavLink></li>
                                <li><NavLink to="/admin/roles/index"><i className="icon dripicons-network-3"></i><span>Roles List</span></NavLink></li>

                            </>
                        }



                    </ul>
                </nav>
            </div >
        </aside >
    )
};

export default SideBar;