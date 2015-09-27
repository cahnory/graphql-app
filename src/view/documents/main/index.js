import polyfill   from '../../utils/polyfill';
import Isomorph   from '../../utils/Isomorph';
import IsoRouter  from '../../utils/Isomorph/transform/react-router';

import Document from '../../components/Document';
import routing  from './routing';

export default new Isomorph(Document, { transform: [IsoRouter(routing)] });

//import AppHomeRoute from './routes/AppHomeRoute';

/*ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document
);*/