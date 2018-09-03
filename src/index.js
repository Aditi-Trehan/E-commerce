import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Products from './products/get';
import Post from './products/post';
import Delete from './products/delete';
import Put from './products/put';

ReactDOM.render(
    <Router>
                <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/products" component={Products}/>
                <Route path="/post" component={Post}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/put" component={Put}/>
                </Switch>
            </Router>
    , document.getElementById('root'));
registerServiceWorker();
