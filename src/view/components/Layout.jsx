import React from 'react';
import Link from './Link';

export default class AppLayout extends React.Component {
  componentWillMount() {
    this.setState({ renderSide: 'server' });
  }

  componentDidMount() {
    this.setState({ renderSide: 'browser' });
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>React app</title>
        </head>
        <body>
          Hello World { this.state.renderSide }!
          
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/body">Body</Link></li>
            <li><Link to="/foo">Foo</Link></li>
          </ul>
          { this.props.children }
        </body>
      </html>
    );
  }
}

export const doctype = '<!DOCTYPE html>';