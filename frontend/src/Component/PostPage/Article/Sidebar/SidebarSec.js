import FeaturedPost from "./FeaturedPost/FeaturedPost"
import TabPosts from "./TabPosts/TabPosts"
import { Link } from "react-router-dom";
import { TagsList, Addsense } from "./TagAndAddData";

const Sidebar = () =>{
  return <div className="sidebar">
    {/* <FeaturedPost /> */}
    <TabPosts />
    {/* Addsense */}
    <div className="advertisement">
      {Addsense.map(adds=>{
        return <div className={adds.device}>  
          <span>Advertisement</span>
          <img src={adds.img} alt=""/>
        </div>
      })}
    </div>
  </div>
}

export default Sidebar