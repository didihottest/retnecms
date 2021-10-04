import {Link} from 'react-router-dom'
import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Moment from 'react-moment';

// component
import { sentChildFashionFilter } from './redux/actions';


const GridSectionFashion = (props)=>{
const {category, imgHm,
        title, date, 
    user,comment,
     view,imgSt
, articleId} = props

	const dispatch = useDispatch();

	// DISPATCH API TO ACTION
	useEffect(()=>{
		dispatch(sentChildFashionFilter())
	},[dispatch])

	// SELECTOR 
	const getChildFashion = useSelector(state=> state.articlesFilter)
	const {childFashionArticle} = getChildFashion
	// console.log('child fashio', childFashionArticle)

    return  <div className="col-md-6">
					<div className="title-section">
						<h1><span className="world">{category}</span></h1>
					</div>

					<div className="news-post image-post2">
						<div className="post-gallery">
							<img width={'570px'} height={'360px'} src={imgHm} alt=""/>
							<div className="hover-box">
								<div className="inner-hover">
									<h2><Link to={`/${articleId}`}>{title}</Link></h2>
									<ul className="post-tags">
										<li><i className="fa fa-clock-o"></i>{date}</li>
										<li><i className="fa fa-user"></i>by <Link to="#">{user}</Link></li>
										{/* <li><Link to="#"><i className="fa fa-comments-o"></i><span>23</span></Link></li>
										<li><i className="fa fa-eye"></i>99</li> */}
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="row">

						{childFashionArticle && childFashionArticle.map((article)=>{
							return <div className="col-md-6" key={article.uuid}>

							<div className="item news-post standard-post">
								<div className="post-gallery">
									<img width={'270px'} height={'200px'} src={article.image1_url} alt="gambar"/>
								</div>
								<div className="post-content">
									<h2><Link to={`/${article.uuid}`}>{article.article_title} </Link></h2>
									<ul className="post-tags">
										<li><i className="fa fa-clock-o"></i>{article.createdAt}</li>
										<li><i className="fa fa-user"></i>by <Link to="#">{article.user.username}</Link></li>
										{/* <li><Link to="#"><i className="fa fa-comments-o"></i><span>00</span></Link></li> */}
									</ul>
								</div>
							</div>
						</div>
						})}
						{/* <div className="col-md-6">

							<div className="item news-post standard-post">
								<div className="post-gallery">
									<img width={'270px'} height={'200px'} src={imgSt} alt=""/>
								</div>
								<div className="post-content">
									<h2><Link to={`/${articleId}`}>{title} </Link></h2>
									<ul className="post-tags">
										<li><i className="fa fa-clock-o"></i>{date}</li>
										<li><i className="fa fa-user"></i>by <Link to="#">{user}</Link></li>
										<li><Link to="#"><i className="fa fa-comments-o"></i><span>00</span></Link></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-6">

							<div className="item news-post standard-post">
								<div className="post-gallery">
									<img width={'270px'} height={'200px'} src={imgSt} alt=""/>
								</div>
								<div className="post-content">
									<h2><Link to={`/${articleId}`}>{title}</Link></h2>
									<ul className="post-tags">
										<li>
											<i className="fa fa-clock-o"></i>{date}
										</li>
										<li>
											<i className="fa fa-user"></i>by <Link to="#">{user}</Link>
										</li>
										<li><Link to="#"><i className="fa fa-comments-o"></i><span>{comment}</span></Link></li>
									</ul>
								</div>
							</div>
						</div> */}

					</div>
    	</div>

}

export default GridSectionFashion;