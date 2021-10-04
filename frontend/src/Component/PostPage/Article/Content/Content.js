import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

const Content=(props)=>{
  const {data} = props;
  const paragraph = data.article_content.split('\n');
    
  return(
    <div>
      <div className="post-content">
        <p> <b>" {data.article_summary} "</b></p>
      </div>
      <br />
      <div className="post-gallery">
        <img src={data.image2_url} alt="" />
      </div>
      <div className="post-content">
        {paragraph.map(p =>{
          return <p>{p}</p>
        })}
      </div>
      <div className="post-tags-box">
        <ul className="tags-box">
          <li><i className="fa fa-tags"></i><span>Tags:  {data.category.category_name}</span></li>
        </ul>
      </div>
    </div>
  )
}


export default Content