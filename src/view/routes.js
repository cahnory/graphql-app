import Relay from 'react-relay';

import Layout   from './components/Layout';
/*
import NotFound from './components/NotFound';
import Foo      from './components/Foo';
import Bar      from './components/Bar';
export const foo = {
  path: 'foo',
  component: Foo
};

export const bar = {
  path: 'bar',
  component: Bar
};

export const notFound = {
  path: '*',
  component: NotFound
};
*/
export default {
  path: '/',
  component: Layout,/*
  indexRoute: foo,
  childRoutes: [foo, bar, notFound],*/
  queries: {
    user: () => Relay.QL`query { user(id:1) {username, email} }`
  }
};