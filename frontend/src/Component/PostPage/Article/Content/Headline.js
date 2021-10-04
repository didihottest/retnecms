import React from "react";
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { sentArticlePage } from "./redux/action";
import Moment from 'react-moment'

const Headline = (props)=>{
  const {data} = props
  // const {title, createdAt, username} = props
  // React.useEffect(()=>{
  //   axios.get(`https://api.retnecms.com/news-article/${articleId}`)
  //     .then(res=>{
  //       const {data, message} = res.data;
  //       if(message === "Get Id News_Article Successfully"){
  //         setHeadline(data)
  //       }else{
  //         alert(message)
  //       }
  //     })
  //     .catch(err=> alert(err))
  // }, [articleId]);

  return(
    <div className="title-post">
        <h1>{data.article_title}</h1>
        <ul className="post-tags">
          <li><i className="fa fa-clock-o"></i><Moment format='DD-MM-YYYY'>{data.createdAt}</Moment></li>
          <li>
            <i className="fa fa-user"></i>by <Link to="#">{data.user.username}</Link>
            </li>
        </ul>
      </div>
  )
}

export default Headline