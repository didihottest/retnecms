import {Link} from 'react-router-dom'
import Data from '../../Data'

const ArticleListWorld = ()=>{
    return <div className="posts-filtered-block">
            <div className="owl-wrapper">
                <h1>Lifestyle</h1>
                <div className="owl-carousel" data-num="4">
                    {Data.map((Data,index)=>{
                        return <div className="item news-post standard-post" key={index}>
						<div className="post-gallery">
							<img src={Data.img} alt=""/>
						</div>
						<div className="post-content">
                            <h2>
                                <Link to="/article">{Data.title}</Link>
                            </h2>
                            <ul className="post-tags">
                                <li><i className="fa fa-clock-o"></i>{Data.date}</li>
                                {/* <li>
                                    <Link to="#">
                                        <i className="fa fa-comments-o"></i><span>{Data.comment}</span>
                                    </Link>
                                </li> */}
                            </ul>
					    </div>
					</div>
                    })}
                    
                </div>

            </div>
    </div>
}

export default ArticleListWorld;