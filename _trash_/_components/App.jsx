import React from 'react';
import Foo from './Foo';
import Bar from './Bar';
import NotFound from './NotFound';
import { Router, Route, Link } from 'react-router';
import IsoRouter from './IsoRouter';

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
    return <div>dedrfez
      Hello from <strong style={{ color: 'green' }}>{ this.state.renderSide }</strong> { this.state.counter }
      { this.props.children } <Foo /> <input type="text" /> foo
    </div>;
  }

}