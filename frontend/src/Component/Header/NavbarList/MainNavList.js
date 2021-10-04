// import {Link} from 'react-router-dom'
// import NavFood from './NavFood/NavFood';
import NavHome from './NavHome/NavHome';
// import NavSport  from './NavSport/NavSport';
// import NavTech from './NavTech/NavTech';
// import NavTravel from './NavTravel/NavTravel';
// import NavVideo from './NavVideo/NavVideo';
// import NavListWorld from './NavWorld/NavListWorld'


const MainNavList = ()=>{
    return (
	// <!-- navbar list container -->
	    <div className="nav-list-container">
            <div className="container">
						{/* <!-- Collect the nav links, forms, and other content for toggling --> */}
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                        <NavHome/>
                        {/* <NavListWorld/> */}
                        {/* <NavTravel/> */}
                        {/* <NavTech/> */}
                        {/* <NavVideo/> */}
                        {/* <NavSport/> */}
                        {/* <NavFood/> */}
                    </ul>
                    {/* <form className="navbar-form navbar-right" role="search">
					    <input type="text" id="search" name="search" placeholder="Search here"/>
					    <button type="submit" id="search-submit"><i className="fa fa-search"></i></button>
					</form> */}
                </div>
            </div>
        </div>

    )           

}


export default MainNavList;