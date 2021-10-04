import img300 from '../../../../../Upload/addsense/300x250.jpg'
import img200 from '../../../../../Upload/addsense/200x200.jpg'


const Addsense = ()=>{
    return <div className="advertisement">
            <div className="desktop-advert">
                <span>Advertisement</span>
                <img src={img300} alt=""/>
            </div>
            <div className="tablet-advert">
                <span>Advertisement</span>
                <img src={img200} alt=""/>
            </div>
            <div className="mobile-advert">
                <span>Advertisement</span>
                <img src={img300} alt=""/>
            </div>
</div>

}

export default Addsense;