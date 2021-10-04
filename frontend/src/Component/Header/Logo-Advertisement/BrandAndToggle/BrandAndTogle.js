import ImageData from '../Images/ImageData'
import {Link} from 'react-router-dom'

const BrandAndToggle = ()=>{
  //PROPS
  
    // <!-- Brand and toggle get grouped for better mobile display -->
    return <div>
          {ImageData.map((data, index)=>{
              
             return <div className="container" key={index}>
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                <Link className="navbar-brand" to="/">
                  <img src={data.logo} alt=""/>
                </Link>
              </div>
      
              <div className="advertisement">
                    <div className="desktop-advert">
                      <span>Advertisement</span>
                      <img src={data.addSense728} alt=""/>
                    </div>
                    <div className="tablet-advert">
                      <span>Advertisement</span>
                      <img src={data.addSense468} alt=""/>
                    </div>
                  </div>
            </div>
})}
    </div>
    
}

export default BrandAndToggle;