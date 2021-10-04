import img728 from '../../../../Upload/addsense/728x90-white.jpg'
import img468 from '../../../../Upload/addsense/468x60-white.jpg'
import img300 from '../../../../Upload/addsense/300x250.jpg'


const Data =[
    {span:"Advertisement",img:img728},
    {span:"Advertisement",img:img468},
    {span:"Advertisement",img:img300},
]

const Addsense =()=>{
        return  <div className="advertisement">
            {Data.map((data,index)=>{
               return <div className="desktop-advert" key={index}>
                   <span>{data.span}</span>
                   <img src={Data.img} alt=""/>
               </div>
            })}

        </div>

}

export default Addsense;