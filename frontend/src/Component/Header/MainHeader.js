import TopLine from './Top-Line/Top-LIne'
import MainNavList from './NavbarList/MainNavList'
import BrandAndToggle from './Logo-Advertisement/MainLogoAdvertise'
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const Header = ()=>{

    return (
        <header className="clearfix sixth-style">
			{/* <!-- Bootstrap navbar --> */}
            <div className="navbar navbar-default navbar-static-top" role="navigation">
                {/* <Router> */}
                    <TopLine/>
                    {/* <Switch>
                        <Route/>
                    </Switch> */}
                    <BrandAndToggle/>
                    <MainNavList/>
                {/* </Router> */}
            </div>
        </header>
    )

}

export default Header;