import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import './index.css';

// All Components
import App from './components/App/App';
import Course from './components/Course/Course'

ReactDOM.render(
    <HashRouter>
        <Route exact path='/' component={App} />
        <Route path='/courses' component={Course} />
    </HashRouter>,
    document.getElementById('root')
);