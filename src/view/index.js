//import polyfill   from '../../utils/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import routes from './routes';

let history = createBrowserHistory();
let createElement = ReactRouterRelay.createElement;

// allow cookie
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);

ReactDOM.render(
  React.createElement(Router, {history, routes, createElement}),
  document.getElementById('app')
);