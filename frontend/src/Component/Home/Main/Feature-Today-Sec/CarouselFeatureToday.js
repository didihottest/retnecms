import {Link} from 'react-router-dom'
import Moment from 'react-moment'


const CarouselFeatureToday =(props)=>{
    const {category, date,
        imgSrc, title,
        user, articleId} = props

    return <div className="item news-post standard-post">
        <div className="post-gallery">
            <img width={'270px'} height={'200px'} src={imgSrc} alt="gambar"/>
            <Link className="category-post fashion" to="/fashion.html">{category}</Link>
        </div>
        <div className="post-content">
            <h2><Link to={`/${articleId}`}>{title}</Link></h2>
			<ul className="post-tags">
				<li><i className="fa fa-clock-o"></i><Moment format='DD-MM-YYYY'>{date}</Moment></li>
				<li><i className="fa fa-user"></i>by <Link to="#">{user}</Link></li>
				{/* <li><Link to="#"><i className="fa fa-comments-o"></i><span>{99}</span></Link></li> */}
			</ul>
        </div>
    </div>
}


export default CarouselFeatureToday;