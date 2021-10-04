
const TickerNews = () =>{
  const BreakingNews = [
    {id:1, time: '11:36 pm', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros...' },
    {id:2, time: '12:40 pm', content: 'Dëshmitarja Abrashi: E kam parë Oliverin në turmë,ndërsa neve na shpëtoi “çika Mille”' },
    {id:3, time: '11: 36 pm', content: 'Franca do të bashkëpunojë me. Kosovën në fushën e shëndetësisë.'},
    {id:4, time: '01.00 am', content: 'DioGuardi, kështu e mbrojti Kosovën në Washington, para serbit Vejvoda'}
  ]

  return <section className="ticker-news"> 
  <div className="container">
    <div className="ticker-news-box">
      <span className="breaking-news">Breaking News</span>
      <span className="new-news">New</span>
      <ul id="js-news">
        {BreakingNews.map((news, index)=>{
          return<li key={index} className="news-item"><span className="time-news">{news.time}</span> {news.content}</li>
        })}
      </ul>
    </div>
  </div>
  </section>
}

export default TickerNews