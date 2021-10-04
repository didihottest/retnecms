import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import Data from './data'
// import img1 from '../../../../../Upload/news-posts/7.jpg'
import Moment from 'react-moment'
import ReactPaginate from 'react-paginate';

// ACTIONS
import { sentLatestArticles } from '../redux/action';

const MasonryBox = () => {
    const dispatch = useDispatch()
    // useEffect 
    useEffect(() => {
        dispatch(sentLatestArticles())
    }, [dispatch])

    const getLatestArticle = useSelector(state => state.latestArticles)
    const { latestArticles, error } = getLatestArticle;
    // console.log('data latest Article =>', latestArticles)

    // LOGIC PAGINATION
    const [pageNumber, setPageNumber] = useState(0)

    const articlesPerPage = 6
    const pagesVisited = pageNumber* articlesPerPage

    const pageCount = Math.ceil(latestArticles.length/ articlesPerPage);

    const changePage = ({selected})=>{
        setPageNumber(selected)    }

    const displayArticles = latestArticles.slice(pagesVisited, pagesVisited + articlesPerPage).map((data) =>{
        return <div className="news-post standard-post3 col-md-6" key={data.uuid}>
        <div className="post-gallery">
            <img width={'370px'} height={'260px'} src={data.image1_url} alt="gambar" />
        </div>
        <div className="post-title">
            <Link to='#' className={`category-post ${data.category.category_name}`}>{data.category.category_name}</Link>
            <h2><Link to={`/${data.uuid}`}>{data.article_title} </Link></h2>
            <ul className="post-tags">
                <li><i className="fa fa-clock-o"></i><Moment format="DD-MM-YYYY">{data.createdAt}</Moment></li>
                <li><i className="fa fa-user"></i>by <Link to='#'>{data.user.username}</Link></li>
                <li><Link to="#"><i className="fa fa-comments-o"></i><span>{data.comment}</span></Link></li>
            </ul>
        </div>
    </div>
    });

    return <div className="masonry-box">
        <div className="title-section">
            <h1><span>Latest Articles</span></h1>
        </div>

        <div className="latest-articles iso-call row">
            {displayArticles}

            {/* <div className="news-post standard-post3 default-size">
                                    <div className="post-gallery">
                                        <img src={img1} alt=""/>
                                    </div>
                                    <div className="post-title">
                                        <a className="category-post tech" href="tech.html">tech</a>
                                        <h2><Link to="single-post.html">Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. </Link></h2>
                                        <ul className="post-tags">
                                            <li><i className="fa fa-clock-o"></i>27 may 2013</li>
                                            <li><i className="fa fa-user"></i>by <Link to="#">John Doe</Link></li>
                                            <li><Link to="#"><i className="fa fa-comments-o"></i><span>23</span></Link></li>
                                        </ul>
                                    </div>
                    </div> */}

            {/* {latestArticles && latestArticles.map((data) => {
                // let category =[data.category.category_name]

                return <div className="news-post standard-post3 col-md-6" key={data.uuid}>
                    <div className="post-gallery">
                        <img width={'370px'} height={'260px'} src={data.image1_url} alt="gambar" />
                    </div>
                    <div className="post-title">
                        <Link to="#" className={`category-post ${data.category.category_name}`}>{data.category.category_name}</Link>
                        <h2><Link to="single-post.html">{data.article_title} </Link></h2>
                        <ul className="post-tags">
                            <li><i className="fa fa-clock-o"></i><Moment format="DD-MM-YYYY">{data.createdAt}</Moment></li>
                            <li><i className="fa fa-user"></i>by <Link to="#">{data.user.username}</Link></li>
                            <li><Link to="#"><i className="fa fa-comments-o"></i><span>{data.comment}</span></Link></li>
                        </ul>
                    </div>
                </div>
            })} */}

            {/* {Data.map((data, index)=>{
                            // let category =[data.category.category_name]
                            return <div className="news-post standard-post3 default-size" key={index}>
                                        <div className="post-gallery">
                                            <img src={data.img} alt="gambar"/>
                                        </div>
                                        <div className="post-title">
                                            <Link to='#' className={data.categorPOst}>{data.category}</Link>
                                            <h2><Link to="single-post.html">{data.title} </Link></h2>
                                            <ul className="post-tags">
                                                <li><i className="fa fa-clock-o"></i>{data.date}</li>
                                                <li><i className="fa fa-user"></i>by <Link to="#">{data.user}</Link></li>
                                                <li><Link to="#"><i className="fa fa-comments-o"></i><span>{data.comment}</span></Link></li>
                                            </ul>
                                        </div>
                                     </div>
                        })} */}
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange = {changePage}
                    containerClassName= {'paginationBtn'}
                    previousLinkClassName={'previousBtn'}
                    nextLinkClassName={'nextBtn'}
                    disabledClassName={'paginationDisabled'}
                    activeClassName={'paginationActive'}
                />
        </div>
        {/* <div className="pagination-box">
            <ul className="pagination-list">
                <li><Link className="active" to="#">1</Link></li>
                <li><Link to="#">2</Link></li>
                <li><Link to="#">3</Link></li>
                <li><span>...</span></li>
                <li><Link to="#">9</Link></li>
                <li><Link to="#">Next</Link></li>
            </ul>
            <p>Page 1 of 9</p>
        </div> */}
    </div>

}

export default MasonryBox;