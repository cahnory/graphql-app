import Relay from 'react-relay';

export default class AddUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {addUser}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddUserPayload {
        user {
          id,
          username,
          email
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      // Forces these fragments to be included in the query
      children: [Relay.QL`
        fragment on AddUserPayload {
          user {
            id,
            username,
            email
          }
        }
      `],
    }];
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password,
      email:    this.props.email
    };
  }
}