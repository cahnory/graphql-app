import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import ReactRouterRelay from 'react-router-relay';
import createLocation from 'history/lib/createLocation'
import routes from './routes';

let createElement = ReactRouterRelay.createElement;

export default function serve(cb) {
  match({ routes, location: createLocation(this.req.url) }, (error, redirectLocation, renderProps) => {
    let output = {};
    if (error) {
      output.error  = error.message;
    } else if (redirectLocation) {
      output.redirect = redirectLocation.pathname + redirectLocation.search;
    } else if (renderProps) {
      renderProps.createElement = ReactRouterRelay.createElement;
      console.log(renderProps);
      output.body = renderToString(React.createElement(RoutingContext, renderProps));
    }

    cb(output);
  });
};