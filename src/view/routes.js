import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';

import App   from './components/App';

export default {
  path: '/',
  component: App,
  createElement: ReactRouterRelay.createElement,
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  }
};