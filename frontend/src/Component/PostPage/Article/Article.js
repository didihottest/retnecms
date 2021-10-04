import { Component } from "react";
import ContentSec from "./Content/ContentPage";
import Sidebar from "./Sidebar/SidebarSec";

class Article extends Component{
  render(){
    return(
      <section className="block-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <ContentSec/>
            </div>
            <div className="col-sm-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Article;