import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import AuthViewerMutation from '../mutations/AuthViewer';

class ViewerLogin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form onSubmit={ e => this._handleSubmit(e) }>
        <div><input onChange={ e => this._handleChange(e) } name="username" /></div>
        <div><input onChange={ e => this._handleChange(e) } name="password" /></div>
        <button>Login</button>
      </form>
    );
  }

  _handleChange(e) { this.setState({[e.target.name]: e.target.value}); }
  _handleSubmit(e)  {
    e.preventDefault();
    Relay.Store.update(new AuthViewerMutation({
      username: this.state.username,
      password: this.state.password
    }));
  }
}


export default Relay.createContainer(ViewerLogin, {
  fragments: {}
});