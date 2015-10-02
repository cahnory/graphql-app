import Isomorph from '../components/Isomorph';
import createComponentFromElement from '../components/Isomorph';

import React from 'react';
import { Router, Route } from 'react-router';
import App from '../components/App';

let router = <Router>
  <Route path="/" component={ App }></Route>
</Router>;
exports.router = router;
export default createComponentFromElement(router);