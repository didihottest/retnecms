import { useContext } from "react";
import { useHistory } from "react-router";
import authservice from "../../services/auth-service";

import { WhoisContext } from "../Context/WhoisContext";

function Header() {
    const history = useHistory()
    const currentUser = useContext(WhoisContext)

    const handleLogout = (e) => {
        e.preventDefault();
        authservice.logout();
        window.location.reload()
    };

    return (
        <nav className="top-toolbar navbar navbar-desktop flex-nowrap">

            <ul className="navbar-nav nav-left">
                <li className="nav-item">
                    <a href data-toggle-state="content-menu-close">
                        <i className="icon dripicons-align-left"></i>
                    </a>
                </li>
            </ul>

            <ul className="site-logo">
                <li>
                    <a href="/admin">
                        <div className="logo">
                            <img src="/logo192.png" id="logo" style={{ width: "25px", height: "25px", objectFit: "cover" }} alt="" />
                        </div>
                        <h1 className="brand-text" style={{ fontFamily: "Ubuntu" }}>Retne</h1>
                    </a>
                </li>
            </ul>

            <ul className="navbar-nav nav-right">
                {currentUser.user_profile
                    ? <div className="nav-item my-3 text-light">{`Howdy, ${currentUser.user_profile.name} !`}</div>
                    : <div className="nav-item my-3 text-light">{`Howdy, ${currentUser.username} !`}</div>}
                <li className="nav-item dropdown">
                    <a className="nav-link nav-pill user-avatar" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                        {currentUser.user_profile
                            ? <img src={currentUser.user_profile.profile_image_url} className="w-35 rounded-circle" alt={currentUser.user_profile.name} />
                            : <img src="/assets/img/avatars/default.png" className="w-35 rounded-circle" alt={currentUser.username} />}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-accout">
                        <div className="dropdown-header pb-3">
                            <div className="media d-user">
                                {currentUser.user_profile
                                    ? <img className="align-self-center mr-3 w-40 rounded-circle" src={currentUser.user_profile.profile_image_url} alt={currentUser.user_profile.name} />
                                    : <img className="align-self-center mr-3 w-40 rounded-circle" src="../assets/img/avatars/default.png" alt="" />}
                                <div className="media-body">
                                    {currentUser.user_profile
                                        ? <h5 className="mt-0 mb-0">{currentUser.user_profile.name}</h5>
                                        : <h5 className="mt-0 mb-0">{currentUser.username}</h5>}
                                    <span>{currentUser.email}</span>
                                </div>
                            </div>
                        </div>
                        <a className="dropdown-item" onClick={() => history.push(`/admin/profile/${currentUser.uuid}`)} style={{ cursor: "pointer" }}>
                            <i className="icon dripicons-user"></i>Profile
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={e => handleLogout(e)} style={{ cursor: "pointer" }}><i className="icon dripicons-lock-open"></i>Sign Out</a>
                    </div>
                </li>
            </ul>

        </nav>
    )
}

export default Header;