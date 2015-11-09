import React from 'react';
import Relay from 'react-relay';

import AddUserMutation from '../mutations/AddUser';

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <form onSubmit={ e => this._handleSubmit(e) }>
        <div><input onChange={ e => this._handleChange(e) } name="username" /></div>
        <div><input onChange={ e => this._handleChange(e) } name="email" /></div>
        <div><input onChange={ e => this._handleChange(e) } name="password" /></div>
        <button>Ajouter</button>
      </form>
    );
  }

  _handleChange(e) { this.setState({[e.target.name]: e.target.value}); }
  _handleSubmit(e)  {
    e.preventDefault();
    var onFailure = (transaction) => {
      console.log('fail', transaction);
    };
    
    var onSuccess = (response) => {
      console.log('yeah', response);
    };
    Relay.Store.update(new AddUserMutation({
      username: this.state.username,
      email:    this.state.email,
      password: this.state.password
    }), {onSuccess, onFailure});
  }
}

export default Relay.createContainer(UserInfo, {
  fragments: {}
});