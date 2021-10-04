import * as React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// component
import SinglePost from './pages/SinglePost/SinglePost8'
import Header from './Component/Header/MainHeader'
import Footer from './Component/Home/Footer/Footer'
import HomePage from './pages/Homepages/Homepage6'

function App() {
  return (
    <div>
      <Router>
           {/* HEADER */}
           <Header/>
          {/* MAIN */}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/:articleId" component={SinglePost} />
            </Switch>
          {/* FOOTER */}
          <Footer/>

      </Router>
         
    </div>
  );
}

export default App;
