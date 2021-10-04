// import {useHistory} from 'react-router-dom';
import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Moment} from 'react-moment';


// COMPONENT
import GridSectionFood from './GridSectionFood';
import GridSectionFashion from './GridSectionFashion';
import { sentChildFashionFilter, sentFashionFilter, sentFoodFilter } from './redux/actions';

const MainGridBox = ()=>{
    
        const dispatch = useDispatch();
        const getArticles = useSelector(state => state.articlesFilter)

        const {
            fashionArticle, foodArticle, error,
        } = getArticles;

        // USEEFFECT
        useEffect (()=>{
            dispatch(sentFashionFilter())
            dispatch(sentFoodFilter())
            // dispatch(sentChildFashionFilter())
          
        },[dispatch])
    

    return <div className="grid-box">   
                <div className="row">   
                    {fashionArticle && fashionArticle.map((article,index)=>{
                        let date= article.createdAt
                        // const {category_name, username} = article 
                        return <div>
                        <GridSectionFashion
                        key= {article.uuid}
                        category = {article.category.category_name}
                        imgHm = {article.image1_url}
                        title= {article.article_title}
                        date= {date}
                        user={article.user.username}
                        // comment = {article.comment}
                        // view= {article.view}
                        imgSt={article.image1_url}
                        articleId= {article.uuid}
                        />
                    </div>
                    })}

                        {foodArticle.map((article,index)=>{
                        let date= article.createdAt
                        // const {category_name, username} = article 
                        return <div>
                        <GridSectionFood
                        key= {index}
                        
                        category = {article.category.category_name}
                        imgHm = {article.image1_url}
                        title= {article.article_title}
                        date= {date}
                        user={article.user.username}
                        // comment = {article.comment}
                        // view= {article.view}
                        imgSt={article.image1_url}
                        articleId= {article.uuid}

                        />
                        </div> 
                        
                        
                    })}
                </div>
            </div>
}

export default MainGridBox;
