import Layout   from '../../components/Layout';
import NotFound from '../../components/NotFound';
import Foo      from '../../components/Foo';
import Bar      from '../../components/Bar';

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

export const root = {
  path: '/',
  component: Layout,
  indexRoute: foo,
  childRoutes: [foo, bar, notFound]
};

export const routing = {
  routes: [root]
};

export default routing;