//packages
import React from "react";
import { Router, Route } from 'react-router-dom';
//components
import Home from "./Home";
import Header from "./Header";
import Tree from "./trees/Tree";
import TreeList from "./trees/TreeList";
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Route path="/" exact component={Home}/>
                    <Route path="/tree/:id" exact component={Tree}/>
                    <Route path="/search" exact component={TreeList}/>
                </div>
            </Router>
        </div>
    )
}

export default App;