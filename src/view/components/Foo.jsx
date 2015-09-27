import React from 'react';

export default class Foo extends React.Component {
  componentWillMount() {
    this.setState({ renderSide: 'server' });
  }

  componentDidMount() {
    this.setState({ renderSide: 'browser' });
  }

  render() {
    return (
      <div>foo</div>
    );
  }
}