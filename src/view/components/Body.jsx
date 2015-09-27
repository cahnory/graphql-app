import React from 'react';

export default class Body extends React.Component {
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
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}