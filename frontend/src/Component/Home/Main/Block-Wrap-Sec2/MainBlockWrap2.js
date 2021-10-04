import LatestArticle from "./Latest-Article/LatestArticle"
import MainSideBar from "./SideBar/MainSideBar"

const MainBlockWrap = ()=>{
    return <section className="block-wrapper">
                <div className="container">
                    <div className="row">
                        <LatestArticle/>
                        <MainSideBar/>

                    </div>
                </div>
            </section>
}

export default MainBlockWrap;