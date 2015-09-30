import React from 'react';
import Foo from './foo';

export default class App extends React.Component {

  componentWillMount() {
    this.state = {
      renderSide: 'server',
      counter: '--'
    };
  }

  componentDidMount() {
    this.setState({
      renderSide: 'browser',
      counter: 0
    });

    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 10
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>
      Hello from <strong style={{ color: 'red' }}>{ this.state.renderSide }</strong> { this.state.counter }
      { this.props.children } <Foo />
    </div>;
  }

}