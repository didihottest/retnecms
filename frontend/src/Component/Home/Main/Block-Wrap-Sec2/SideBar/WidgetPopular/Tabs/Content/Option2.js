import {Link} from 'react-router-dom'

const Option2 =(props)=>{
const {imgSrc, title, date} = props
    return <li>
            <img src={imgSrc} alt=""/>
            <div className="post-content">
                <h2><Link to="single-post.html">{title}</Link></h2>
                <ul className="post-tags">
                    <li><i className="fa fa-clock-o"></i>{date}</li>
                </ul>
            </div>
        </li>
}

export default Option2;