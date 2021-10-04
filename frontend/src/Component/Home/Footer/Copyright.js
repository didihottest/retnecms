import {Link} from 'react-router-dom'

const CopyRight = ()=>{
    return <div className="footer-last-line">
    <div className="row">
        <div className="col-md-6">
            <p>&copy; COPYRIGHT 2021 RETNECMS</p>
        </div>
        <div className="col-md-6">
            <nav className="footer-nav">
                <ul>
                    <li><Link to="#">Home</Link></li>
                    {/* <li><Link to="#">Purchase Theme</Link></li> */}
                    <li><Link to="#">About</Link></li>
                    <li><Link to="#">Contact</Link></li>
                </ul>
            </nav>
        </div>
    </div>
</div>
}
export default CopyRight