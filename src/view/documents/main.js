import polyfill from '../utils/polyfill';
import Isomorph from '../utils/Isomorph';
import Router   from '../utils/Isomorph/transform/react-router';

import Layout   from '../components/Layout';
import Body     from '../components/Body';
import Foo      from '../components/Foo';
import Bar      from '../components/Bar';
import NotFound from '../components/NotFound';

export default new Isomorph(Layout, {
  transform: [
    Router({
      indexRoute: {
        component: Body
      },
      routes: [{
        path: '/',
        component: Body,
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
      }],
      handleNotFound: true
    })
  ]
});

//import AppHomeRoute from './routes/AppHomeRoute';

/*ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document
);*/