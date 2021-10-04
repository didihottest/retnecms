import {Link} from 'react-router-dom'

const NavHome = ()=>{
    return (
        <li>
            <Link className="home" to="/">Home</Link>
     </li>
    )
}

export default NavHome;