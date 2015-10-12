import React from 'react';
import Relay from 'react-relay';
import Link from './Link';

export default class Layout extends React.Component {
  componentWillMount() {
    this.setState({ renderSide: 'server' });
  }

  componentDidMount() {
    this.setState({ renderSide: 'browser' });
  }

  render() {
    return (
      <div>
        <h1>React app</h1>
        Hello World { this.state.renderSide }!
        
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/bar">Bar</Link></li>
          <li><Link to="/foo">Foo</Link></li>
          <li><Link to="/unknown">Unknown route</Link></li>
        </ul>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Layout, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        username
      }
    `
  }
});