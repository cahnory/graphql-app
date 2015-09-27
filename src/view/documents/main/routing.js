import Layout   from '../../components/Layout';
import NotFound from '../../components/NotFound';
import Foo      from '../../components/Foo';
import Bar      from '../../components/Bar';

export const foo = {
  
};

export const routing = {
  indexRoute: {
    component: Layout
  },
  routes: [{
    path: '/',
    component: Layout,
    indexRoute: {
      component: Foo
    },
    childRoutes: [
      {
        path: 'foo',
        component: Foo
      },
      {
        path: 'bar',
        component: Bar
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }]
};

export default routing;