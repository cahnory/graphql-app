import React from 'react';

export default class Document extends React.Component {
  componentWillMount() {
    this.setState({ renderSide: 'server' });
  }

  componentDidMount() {
    this.setState({ renderSide: 'browser' });
  }

  render() {
    return <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React app</title>
        <link href="/assets/css/main.css" rel="stylesheet" />
      </head>
      <body>
        { this.props.children }
      </body>
    </html>;
  }
}

export const doctype = '<!DOCTYPE html>';