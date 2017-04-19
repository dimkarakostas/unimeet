import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Welcome} />
        </div>
    </Router>,
    document.getElementById('root')
);
