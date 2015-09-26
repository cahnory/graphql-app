import React from 'react';
import { Isomorph } from '../utils/isomorph';
import { Link } from 'react-router';

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
          Hello World!<br />
          Your are currently viewing <strong>{ this.state.renderSide }</strong> side render.
          <div>
            <Link to="/">Home</Link> |
            <Link to="/foo">foo</Link> |
            <Link to="/bar">bar</Link> |
            <Link to="/foo/bar">foo/bar</Link>
          </div>
          { this.props.children }
          <Isomorph />
        </body>
      </html>
    );
  }
}

export const doctype = '<!DOCTYPE html>';