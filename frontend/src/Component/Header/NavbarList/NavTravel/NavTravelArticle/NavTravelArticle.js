import {Link} from 'react-router-dom'


const NavTravelArticle = (props)=>{
    const {ImgSrc, Title, Date, Comment} = props


    return <div className="item news-post standard-post">
                <div className="post-gallery">
                    <img width={'270px'} height={'200px'} src={ImgSrc} alt="" />
                </div>
                <div className="post-content">
                    <h2>
                        <Link to="#">{Title}</Link>
                    </h2>
                    <ul className="post-tags">
                        <li><i className="fa fa-clock-o"></i>{Date}</li>
                       {/* <li>
                           <Link to="#">
                               <i className="fa fa-comments-o"></i>
                               <span>{Comment}</span>
                            </Link>
                       </li> */}
                    </ul>
                </div>
            </div>

}

export default NavTravelArticle;