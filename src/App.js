import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar">
             <Link to='/' className="logo"><img src={'/assets/images/bloc_jams_logo.png'}/></Link>
            <div className = "links-container">
            <Link to='/library' className="navbar-link">Library</Link>
            
       </div>
            </nav>
            <Route exact path="/" component={Landing} />
            <Route path="/library" component={Library} />
            <Route path="/album/:slug" component={Album}/>
      </div>
    );
  }
}

export default App;
