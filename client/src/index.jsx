import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';
import './index.css';

// All Components
import App from './containers/App/App';

const history = createBrowserHistory();
ReactDOM.render(<App history={history} />, document.getElementById('root'));
