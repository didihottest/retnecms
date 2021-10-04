import {Link} from 'react-router-dom'
import Data from '../Data'
import CarouselFood from './CarouselFood/CarouselFood'

const NavFood =()=>{
    return <li>
            <Link className="food" to="#">Food &amp; Health</Link>
            <div className="megadropdown">
			<div className="container">
			    <div className="inner-megadropdown food-dropdown">

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
                                <CarouselFood
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

export default NavFood;