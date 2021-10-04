import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Link} from 'react-router-dom'
import NavTravelArticle from './NavTravelArticle/NavTravelArticle'

// DATA DUMMY YG SAMA
// import Data from '../Data'
import { sentTravelArticles } from './redux/actions';

const NavTravel = ()=>{

    const dispatch = useDispatch();
    // let Datas = [];
    // const [dataTravel, setTravelData] = React.useState([]);
    
    // console.log('travel artikel=>', dataTravel)

    // USEEFFECT:
    useEffect(()=>{
        dispatch(sentTravelArticles())
    },[dispatch])
    
    const getNavTravel = useSelector(state => state.navTravelArticles)
    const {travelArticles,error} = getNavTravel;

    // if(travelArticles) {
    //     Datas.push = travelArticles;
    // }
    // console.log('data dong =>', travelArticles);
    // useEffect(()=>{
    //     setTravelData(travelArticles)
        
    // },[travelArticles])    

    return <li>
        <Link to="#" className="travel">Travel</Link>
        <div className="megadropdown">
            <div className="container">
                <div className="inner-megadropdown travel-dropdown">
                    <div className="owl-wrapper">
                        <h1>Latest Posts</h1>
                        <div className="owl-carousel" data-num="4">

                        {travelArticles && travelArticles.map((Data,index)=>{
                        return <div>
                                <NavTravelArticle
                                    key={Data.uuid}
                                    ImgSrc={Data.image1_url}
                                    Title={Data.article_title}
                                    Date={Data.createdAt}
                                    // Comment={Data.comment}
                                /> 
                                </div>
                        })} 

                        {/* {Data.map((data,index)=>{
                                return <div>
                                <NavTravelArticle
                                    key={index}
                                    ImgSrc={data.img}
                                    Title={data.title}
                                    Date={data.date}
                                    // Comment={data.comment}
                                />      
                                </div>
                                
                            })} */}
                        </div>
                    </div>        
                </div>
            </div>
        </div>

    </li>
}

export default NavTravel;