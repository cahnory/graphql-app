import React from 'react';
import { Router, RoutingContext, match } from 'react-router';
import { createLocation , createMemoryHistory, createHistory } from 'history';

export class IsoRoute extends React.Component {

  render() {
    let location = createLocation(this.props.path);
    let history = process.browser ? createHistory() : createMemoryHistory();
    //https://github.com/rackt/react-router/blob/master/modules/matchRoutes.js
    let element = <div>IsoRoute doesn't accept routes with asynchronous getChildRoutes method</div>;

    match(
      {routes: this.props.routes || this.props.children, history: history, location: location},
      (error, redirect, routeProps) => {/*
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
        }*/

        element = isBrowser
          ? <Router {...routeProps} routes={ this.props.routes || this.props.children }/>
          : <RoutingContext {...this.props}></RoutingContext>;
        console.log(element);
      }
    );
    console.log('foo');

    return element;
  }
}