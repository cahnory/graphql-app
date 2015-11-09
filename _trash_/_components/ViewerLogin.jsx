import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import ViewerLoginMutation from '../mutations/ViewerLogin';

class ViewerLogin extends React.Component {
  componentWillMount() {
    this.setState({
      viewer: this.props.viewer
    });
  }
  _handleLogin() {
    // To perform a mutation, pass an instance of one to `Relay.Store.update`
    Relay.Store.update(new ViewerLoginMutation({
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value,
      viewer: this.props.viewer.node
    }));
  }

  render() {
    return (
      <form>
        <input ref="username" />
        <input ref="password" type="password" />
        <button type="button" onClick={e => this._handleLogin()}>Like this</button>
      </form>
    );
  }
}


export default Relay.createContainer(ViewerLogin, {
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