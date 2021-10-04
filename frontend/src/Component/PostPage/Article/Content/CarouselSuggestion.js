import { Link } from 'react-router-dom'
import art3 from '../../../Upload/news-posts/art3.jpg'
import { Data} from './DataSuggestion'

const Suggestion = () =>{
  return <div className="carousel-box owl-wrapper">
      <div className="title-section">
        <h1><span>You may also like</span></h1>
      </div>
      <div className="owl-carousel" data-num="3">
        {Data.map(data=>{
          return <div className="item news-post image-post3"> 
            <img src={data.img} alt="" />
            <div className="hover-box">
              <h2><Link to="#">{data.title}</Link></h2>
              <ul className="post-tags">
                <li><i className="fa fa-clock-o"></i>27 May 2013</li>
              </ul>
            </div>
          </div>
        })}
      </div>
  </div>
}

export default Suggestion