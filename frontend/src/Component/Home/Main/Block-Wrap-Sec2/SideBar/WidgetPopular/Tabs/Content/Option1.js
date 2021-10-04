import {Link} from 'react-router-dom'
import Moment from 'react-moment'

const Option1 =(props)=>{
const {imgSrc, title, date, articleId} = props
    return <li>
            <img src={imgSrc} alt=""/>
            <div className="post-content">
                <h2><Link to={`/${articleId}`}>{title}</Link></h2>
                <ul className="post-tags">
                    <li><i className="fa fa-clock-o"></i><Moment format='DD-MM-YYYY'>{date}</Moment></li>
                </ul>
            </div>
        </li>
}

export default Option1;