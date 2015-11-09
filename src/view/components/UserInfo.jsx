import React from 'react';
import Relay from 'react-relay';

class UserInfo extends React.Component {
  render() {
    let account = this.props.viewer.account || {};
    return (
      <div>
        Hello <strong>{ account.username }</strong>
        {
          account.email ?
          <a href={ 'mailto:' + account.email }>{ account.email }</a> :
          null
        }
      </div>
    );
  }
}

export default Relay.createContainer(UserInfo, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        account {
          username,
          email
        }
      }
    `
  }
});