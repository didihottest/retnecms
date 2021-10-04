import {Link} from 'react-router-dom'
import Data from '../Data'
import CarouselTech from './CarouselTech/CarouselTech'

const NavTech =()=>{
    return <li>
         <Link className="tech" to="/news-category2.html">Tech</Link>  
         <div className="megadropdown">
			<div className="container">
			    <div className="inner-megadropdown tech-dropdown">

			        <div className="owl-wrapper">
                        <ul className="horizontal-filter-posts">
                            <li><Link className="active" to="#">All</Link></li>
                            <li><Link to="#">Software</Link></li>
                            <li><Link to="#">Internet</Link></li>
                            <li><Link to="#">Mobile</Link></li>
                        </ul>
                        <div className="owl-carousel" data-num="4">
                            {Data.map((data,index)=>{
                                return <div>
                                <CarouselTech
                                    key={index}
                                    ImgSrc={data.img}
                                    Title={data.title}
                                    Date={data.date}
                                    // Comment={data.comment}
                                />      
                                </div>
                                
                            })}
                        </div>                   
                    </div>
                </div>
            </div>
        </div>       
    </li>
}

export default NavTech;