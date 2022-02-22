//packages
import React from "react";
import { Router, Route } from 'react-router-dom';
//components
import Home from "./Home";
import Navbar from "./Navbar";
import Tree from "./trees/Tree";
import TreeList from "./trees/TreeList";
import Statistics from "./Statistics";
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Navbar />
          <Route path="/" exact component={Home}/>
          <Route path="/tree/:id" exact component={Tree}/>
          <Route path="/search/:searchBy/:key" exact component={TreeList}/>
          <Route path="/statistics" exact component={Statistics}/>
        </div>
      </Router>
    </div>
  )
}

export default App;