import React from 'react';
import { Isomorph, getHistory } from '../utils/isomorph';

import { Router, Route, Link } from 'react-router';
import AppLayout from './AppLayout';
import PageFoo from './PageFoo';
import PageBar from './PageBar';

export default class App extends React.Component {
  componentWillMount() {
    this.setState({ renderSide: 'server' });
  }

  componentDidMount() {
    this.setState({ renderSide: 'browser' });
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>React app</title>
        </head>
        <body>
          Hello World!<br />
          Your are currently viewing <strong>{ this.state.renderSide }</strong> side render.
          <Router history={ getHistory() }>
            <Route path="/" component={AppLayout}>
              <Route path="foo" component={PageFoo} />
              <Route path="bar" component={PageBar} />
            </Route>
          </Router>
          <Isomorph />
        </body>
      </html>
    );
  }
};

export const doctype = '<!DOCTYPE html>';