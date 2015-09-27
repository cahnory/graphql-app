import React from 'react';
import { globalKey } from '../utils';

export default function isomorphTransform() {
  return function (data, next) {
    var Component = data.Component;
    var src = data.src;
    var props = JSON.parse(JSON.stringify(data.props));//dirty clone

    // Isomorphed
    data.Component = class IsoComponent extends React.Component {
      render () {
        return <Component{ ...props }>
          { this.props.children }
          <script dangerouslySetInnerHTML={{ __html: 'var ' + globalKey + '=' + JSON.stringify(props) }}></script>
          <script src={ src }></script>
        </Component>;
      }
    };

    data.props = {};

    next();
  };
};

isomorphTransform.getProps = function() {
  return global[globalKey];
}