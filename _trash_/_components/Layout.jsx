import React from 'react';
import Relay from 'react-relay';
import Link from './Link';
import ViewerLogin from './ViewerLogin';

class Layout extends React.Component {
  render() {
    return (
      <div>
        Layout {this.props.viewer.account ? this.props.viewer.account.username : 'anonymous'}
        { this.props.children }
        { this.props.viewer.account ? this.props.viewer.account.username : <ViewerLogin viewer={ this.props.viewer } /> }
      </div>
    );
  }
}

export default Relay.createContainer(Layout, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${ViewerLogin.getFragment('viewer')}
      }
    `/*,
    user: () => Relay.QL`
      fragment on User {
        username,
        email
      }
    `*/
  }
});