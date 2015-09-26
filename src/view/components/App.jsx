import React from 'react';
import { Router, Route } from 'react-router';
import { getHistory } from '../utils/isomorph';

import Layout from './Layout';
import NotFound from './NotFound';
import PageFoo from './PageFoo';
import PageBar from './PageBar';

export default class App extends React.Component {
  render() {
    return (
      <Router history={ getHistory() }>
        <Route path="/" component={Layout}>
          <Route path="bar" component={PageBar} />
          <Route path="foo" component={PageFoo} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
};

export const doctype = Layout.doctype;