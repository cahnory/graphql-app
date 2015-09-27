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
    let location = createLocation(data.location);
    let history = isBrowser ? createHistory() : createMemoryHistory();
    let Component = data.Component;
    let props = data.props;

    match(
      {routes: options.routes, history: history, location: location},
      function (error, redirect, routeProps) {
        if (redirect) {
          data.status = 301;
          data.redirect = redirect;
          error = 301;
        } else if (error) {
          data.status = 500;
          data.error = error;
        } else if (routeProps === null) {
          data.status = 404;
          error = options.handleNotFound ? error : 404;
        } else {
          data.status = 200;
        }

        data.props = routeProps;
        data.Component = class IsoRouterContext extends React.Component {
          render() {
            return isBrowser
              ? <Component {...props}><Router location={location} history={history} routes={options.routes}/></Component>
              : <Component {...props}><RoutingContext {...this.props}></RoutingContext></Component>;
          }
        };

        next(error);
      }
    );
  };
}