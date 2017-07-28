import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './components/welcome';
import {Contact} from './components/contact';
import {Chat} from './components/chat';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './styles.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/chat' component={Chat} />
            <Redirect from='*' to='/' />
        </Switch>
    </Router>,
    document.getElementById('root')
);
