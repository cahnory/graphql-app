import polyfill from '../utils/polyfill';
import Isomorph from '../utils/Isomorph';
import Router   from '../utils/Isomorph/transform/react-router';

import Layout   from '../components/Layout';
import Body     from '../components/Body';
import Foo      from '../components/Foo';
import NotFound from '../components/NotFound';

export default new Isomorph(Layout, '/assets/js/main.js', {
  transform: [
    Router({
      routes: [
        {
          path: 'body',
          component: Body
        },
        {
          path: 'foo',
          component: Foo
        },
        {
          path: '*',
          component: NotFound
        }
      ],
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