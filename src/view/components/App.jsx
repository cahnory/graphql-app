import React from 'react';
import Relay from 'react-relay';

import UserInfo from './UserInfo';
import UserCreator from './UserCreator';
import ViewerLogin from './ViewerLogin';

class App extends React.Component {
  render() {
    return (
      <div>
        You are in the app !
        <UserCreator />
        <ViewerLogin />
        <UserInfo viewer={ this.props.viewer } />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${UserInfo.getFragment('viewer')}
      }
    `
    // ${UserCreator.getFragment('user')}
  }
});