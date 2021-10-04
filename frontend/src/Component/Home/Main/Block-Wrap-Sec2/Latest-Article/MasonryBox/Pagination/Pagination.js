import {Link} from 'react-router-dom'

const PaginationBox = ()=>{
    return 	<div className="pagination-box">
         <ul className="pagination-list">
            <li><Link className="active" to="#">1</Link></li>
            <li><Link to="#">2</Link></li>
            <li><Link to="#">3</Link></li>
            <li><span>...</span></li>
            <li><Link to="#">9</Link></li>
            <li><Link to="#">Next</Link></li>
        </ul>
            <p>Page 1 of 9</p>
</div>
}

export default PaginationBox;