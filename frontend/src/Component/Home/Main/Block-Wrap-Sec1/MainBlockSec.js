// import Addsense from "./Addsense/Adsense"
import MainGridBox from "./Grid-Box/MainGridBox"

const MainBlockWrapperSec = ()=>{
    return <section className="block-wrapper">
                <div className="container">
                    {/* <!-- block content --> */}
				    <div className="block-content non-sidebar">
                        {/* Google Adsense */}
                        {/* <Addsense/> */}
                        <MainGridBox/>  
                    </div>
                </div>
            </section>
}

export default MainBlockWrapperSec;