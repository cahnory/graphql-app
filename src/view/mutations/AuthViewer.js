import Relay from 'react-relay';

export default class AuthViewerMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {authViewer}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AuthViewerPayload {
        viewer {
          account {
            id,
            username,
            email
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      // Forces these fragments to be included in the query
      children: [Relay.QL`
        fragment on AuthViewerPayload {
          viewer {
            account {
              id,
              username,
              email
            }
          }
        }
      `],
    }];
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password
    };
  }
}