//import polyfill   from '../../utils/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import routes from './routes';

let history = createBrowserHistory();
let createElement = ReactRouterRelay.createElement;

ReactDOM.render(React.createElement(Router, {history, routes, createElement}), document.getElementById('app'));