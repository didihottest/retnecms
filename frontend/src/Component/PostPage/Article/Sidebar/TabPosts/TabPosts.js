import { Link, useParams } from "react-router-dom"
// import { Recent } from "./DataTab"
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect,useState, useRef } from 'react';
import { sentWidgetRecentArticles } from "../../../../Home/Main/Block-Wrap-Sec2/SideBar/WidgetPopular/redux/actions";
import Moment from 'react-moment'
import { sentNextArticlePage } from "../../Content/redux/action";


const TabPosts = () =>{
  const [nextRoute, setNextRoute] = useState('');
  const {articleId} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(sentWidgetRecentArticles())
  }, [dispatch])

  useEffect(()=>{
    setNextRoute(articleId);
    if(nextRoute !== '' && nextRoute){
      dispatch(sentNextArticlePage(nextRoute));
    }
  })

  const getRecentArticles = useSelector(state=>state.widgetRecent);
  const {recentArticles} = getRecentArticles;

  return <div className="widget tab-posts-widget">
    <ul className="nav nav-tabs">
      <li className="active">
        <Link to="#option1" data-toggle="tab">Recent</Link>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane active" id="option1"> 
        <ul className="list-posts">
          {recentArticles.map((posts, i)=>{
            return<li>
              <img  src={posts.image1_url} alt=""/>
              <div className="post-content">
                <h2><Link to={`/${posts.uuid}`}>{posts.article_title}</Link></h2>
              </div>
              <ul className="post-tags">
                <li><i className="fa fa-clock-o"></i><Moment format='DD-MM-YYYY'>{posts.createdAt}</Moment></li>
              </ul>
            </li>
          })}
        </ul>
      </div>
    </div>
  </div>
}

export default TabPosts