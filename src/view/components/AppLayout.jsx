import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <div><Link to="/foo">foo</Link> | <Link to="/bar">bar</Link></div>
        { this.props.children }
      </div>
    );
  }
}