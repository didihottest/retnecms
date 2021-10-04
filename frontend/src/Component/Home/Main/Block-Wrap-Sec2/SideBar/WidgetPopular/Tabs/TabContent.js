import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
// import {Data1,Data2} from './Content/data'
import Option1 from './Content/Option1'
// import Option2 from './Content/Option2'

// ACTION
import { sentWidgetRecentArticles } from '../redux/actions';

const TabContent = ()=>{
    const dispatch= useDispatch();
    // useEffect 
    useEffect(()=>{
        dispatch(sentWidgetRecentArticles())    
    },[dispatch])

    const getRecentArticles = useSelector(state => state.widgetRecent)
    const {recentArticles, error} = getRecentArticles;

    console.log('recent article', recentArticles);


    return <div className="tab-content">
            <div className="tab-pane active" id="option1">
                <ul className="list-posts">
                     {recentArticles && recentArticles.map((data,index)=>{
                        return <Option1
                                key={data.uuid}
                                imgSrc= {data.image1_url}
                                date= {data.createdAt}
                                title= {data.article_title}
                                articleId= {data.uuid}
                            />
                     
                     })}

                </ul>
            </div>

            {/* <div className="tab-pane" id="option2">
                <ul className="list-posts">
                {Data2.map((data,index)=>{
                        return <Option2
                                key={index}
                                imgSrc= {data.img}
                                date= {data.date}
                                title= {data.title}
                            />
                      
                     })}
                </ul>
            </div> */}

    </div>
}

export default TabContent