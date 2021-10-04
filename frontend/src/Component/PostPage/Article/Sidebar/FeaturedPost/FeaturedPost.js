import { Link } from 'react-router-dom'
import im1 from '../../../../Upload/news-posts/im1.jpg'
import im2 from '../../../../Upload/news-posts/im2.jpg'
import im3 from '../../../../Upload/news-posts/im3.jpg'

const FeaturedPost = () =>{
  const Posts = [im3, im1, im2]
  return <div className="widget features-slide-widget">
    <div className="title-section">
      <h1><span>Featured Posts</span></h1>
    </div>
    <div className="image-post-slider">
      <ul className="bxslider">
        {Posts.map(post=>{
          return <li>
            <div className="news-post image-post2">
              <div className="post-gallery">
                <img src={post} alt="" />
                <div className="hover-box">
                  <div className="inner-hover">
                    <h2><Link to="#">Pellentesque odio nisi, euismod in, pharetra a, ultriciesin, diam.</Link></h2>
                    <ul className="post-tags">
                      <li><i className="fa fa-clock-o"></i>27 May 2013</li>
                      <li><i className="fa fa-user"></i>by <Link to="#">John Doe</Link></li>
                      <li><Link to="#"><i className="fa fa-comments-o"></i><span>23</span></Link></li>
                      <li><i className="fa fa-eye"></i>872</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default FeaturedPost