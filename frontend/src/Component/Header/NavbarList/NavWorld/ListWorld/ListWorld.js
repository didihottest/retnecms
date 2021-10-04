import {Link} from 'react-router-dom'

const ListWorld = ()=>{
    return(
        <div className="filter-block">
            <div className="filter-posts">
                <ul className="filter-posts">
					<li>
                        <Link className="active" to="#">Politics</Link>
                    </li>
					<li>
                        <Link to="#">Business</Link>
                    </li>
					<li>
                        <Link className="active" to="#">Lifestyle</Link>
                    </li>
					<li>
                        <Link to="#">Economy</Link>
                    </li>
					<li>
                        <Link to="#">Music</Link>
                    </li>
                </ul>
            </div>
        </div>
    )    
}

export default ListWorld;