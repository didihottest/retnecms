import {Link} from 'react-router-dom'
import CarouselVideo from './CarouselVideo'
import Data from './Data'
const NavVideo =()=>{
    return <li>
        <Link className="video" to="#">Video</Link>
        <div className="megadropdown">
				<div className="container">
					<div className="inner-megadropdown video-dropdown">
                        <div className="owl-wrapper">
							<h1>Latest Posts</h1>
							<div className="owl-carousel" data-num="4">
                                {Data.map((data,index)=>{
                                    return <div>
                                      <CarouselVideo
                                        key={index}
                                        title={data.title}
                                        date={data.date}
                                        ImgSrc={data.img}
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

export default NavVideo;