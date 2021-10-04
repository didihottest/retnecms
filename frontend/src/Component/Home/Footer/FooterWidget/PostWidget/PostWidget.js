// import Data from './Data'
import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import React,{useEffect} from 'react';
import {Moment} from 'react-moment';

// ACTION:
import { sentRandomArticles } from './redux/actions';

const PostWidget = ()=>{
const dispatch = useDispatch();

// effect for running action Code:
useEffect(()=>{
    dispatch(sentRandomArticles())
},[dispatch])

// take data from store with useSelector:
const getRandomArticles = useSelector(state=> state.randomPostFooter)
const {randomPost, error} = getRandomArticles;

// console.log('random data', randomPost)

    return <div className="col-md-4">
            <div className="widget posts-widget">
                <h1>Random Post</h1>
                <ul className="list-posts">
                      {randomPost && randomPost.map((data, index)=>{
                          const date = data.createdAt

                          return <li key={data.uuid}>
                                <img src={data.image1_url} alt="gambar"/>
                                <div className="post-content">
                                    <Link to="#">{data.category.category_name}</Link>
                                    <h2><Link to={`/${data.uuid}`}>{data.article_title}</Link></h2>
                                    <ul className="post-tags">
                                        <li><i className="fa fa-clock-o"></i>
                                            {data.createdAt}        
                                            </li>
                                    </ul>
                                </div>
                      </li> 

                      })}
                    
                </ul>
            </div>

    </div>
}

export default PostWidget;