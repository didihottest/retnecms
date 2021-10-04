import {Link} from 'react-router-dom'
import Data from '../Data'
import CarouselSport from './CarouselSport/CarouselSport'

const NavSport =()=>{
    return <li>
            <Link className="sport" to="#">Sport</Link>
            <div className="megadropdown">
			<div className="container">
			    <div className="inner-megadropdown sport-dropdown">

			        <div className="owl-wrapper">
                        {/* <ul className="horizontal-filter-posts">
                            <li><Link className="active" to="#">All</Link></li>
                            <li><Link to="#">Software</Link></li>
                            <li><Link to="#">Internet</Link></li>
                            <li><Link to="#">Mobile</Link></li>
                        </ul> */}
                        <h1>Latest Posts</h1>
                        <div className="owl-carousel" data-num="4">
                            {Data.map((data,index)=>{
                                return <div>
                                <CarouselSport
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

export default NavSport;