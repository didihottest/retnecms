import MasonryBox from './MasonryBox/MasonryBox'
import PaginationBox from './MasonryBox/Pagination/Pagination'

const LatestArticle = () => {
    return <div className="col-sm-8 content-blocker">
        {/* <!-- block content --> */}
        <div className="block-content">
            <MasonryBox />
        </div>
        {/* <div className="block-content">
            <PaginationBox />
        </div> */}
    </div>

}

export default LatestArticle;
