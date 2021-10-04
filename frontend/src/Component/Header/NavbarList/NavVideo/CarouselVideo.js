import {Link} from 'react-router-dom'


const CarouselVideo =(props)=>{
const{title,date,ImgSrc}= props

    return <div className="item news-post video-post">
            <img alt="" src={ImgSrc}/>
			<Link to="https://www.youtube.com/watch?v=LL59es7iy8Q" class="video-link"><i className="fa fa-play-circle-o"></i></Link>
            <div className="hover-box">
				<h2><Link to="single-post.html">{title}</Link></h2>
				<ul className="post-tags">
					<li><i className="fa fa-clock-o"></i>{date}</li>
				</ul>
			</div>

    </div>


}

export default CarouselVideo;