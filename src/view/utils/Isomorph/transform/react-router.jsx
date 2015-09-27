import React from 'react';
import Router from 'react-router';
import { isBrowser } from '../utils';
import { match, RoutingContext } from 'react-router';
import { createLocation , createMemoryHistory, createHistory } from 'history';

export default function (options) {
  options = options || {};
  options.routes = [].concat(options.routes || []);
  options.base = options.base || '/';
  options.handleNotFound = !!options.handleNotFound;
  
  return function (data, next) {
    let routes = [{
      path: options.base,
      component: data.Component,
      childRoutes: options.routes
    }];

    data.Component = class Context extends React.Component {
      render() {
        return <Router routes={routes} {...this.props}/>;
      }
    };

    transform(data, routes, next);
  }
}

function transform(data, routes, next) {
  let history = isBrowser ? createHistory() : createMemoryHistory();
  let location = createLocation(data.location);

  match({routes: routes, history: history, location: location},
    function (error, redirect, renderProps) {
      if (redirect) {
        data.status = 301;
        data.redirect = redirect;
        next(301);
      } else if (error) {
        data.status = 500;
        data.error = error;
        next(error);
      } else {
        if (renderProps === null) {
          data.status = 404;
          renderProps = {
            routes: routes,
            history: history,
            location: location,
            params: {},
            components: []
          };
        } else {
          data.status = 200;
        }

        // merge props
        for (let i in renderProps) {
          if (renderProps.hasOwnProperty(i)) {
            data.props[i] = renderProps[i];
          }
        }
        // switch Component
        data.Component = RoutingContext;
        next();
      }
    }
  );
}