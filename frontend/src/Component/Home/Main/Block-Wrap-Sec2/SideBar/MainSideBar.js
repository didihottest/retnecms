import Addsense from "./Addsense/Addsense"
import MainWidgetPopular from "./WidgetPopular/MainWidgetPopular"
// import MainSubscribe from "./WidgetSubscribe/MainSubscribe"
// import MainTags from "./WidgetTags/MainTags"

const MainSideBar = () => {
    return <div className="col-sm-4 sidebar-sticky">
        {/* <!-- sidebar --> */}
        <div className="sidebar theiaStickySidebar">
            <MainWidgetPopular />
            {/* <MainSubscribe/> */}
            {/* <MainTags/> */}
            <Addsense />

        </div>
    </div>
}

export default MainSideBar;