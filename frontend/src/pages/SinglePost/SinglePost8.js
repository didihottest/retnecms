import { Component } from "react"

// MAIN COMPONENT
import TickerNews from '../../Component/PostPage/Ticker-News/TickerNews'
import Article from '../../Component/PostPage/Article/Article'
import { extend } from "date-and-time"
import React from "react"

const SinglePost =()=>{

    return(
      <div>
        {/* <TickerNews /> */}
        <Article />
      </div>
    )

}
export default SinglePost