//import polyfill   from '../../utils/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

let history = createBrowserHistory();
require('./styles/index.scss');

ReactDOM.render(React.createElement(Router, {history, routes}), document.getElementById('app'));