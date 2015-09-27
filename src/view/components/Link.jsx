import React from 'react';
import {Link as RouterLink} from 'react-router';

export default class Link extends React.Component {

  render() {
    return <RouterLink activeClassName="--current" {...this.props}>{ this.props.children }</RouterLink>;
  }

};