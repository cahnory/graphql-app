import React from 'react';
import { globalKey, isBrowser, asyncLoop } from './utils';
import isomorphTransform from './transform/isomorph';

export default class Isomorph {

  constructor(Component, src, options) {
    options = options || {};
    this.src = src;
    this.Component = Component;
    this.transform = [isomorphTransform()].concat(options.transform || []);

    if (isBrowser) {
      this.render(isomorphTransform.getProps(), location.pathname + location.search + location.hash);
    }
  }

  render(props, location, callback, onError) {
    asyncLoop(
      {
        Component: this.Component,
        props: props,
        location: '' + location,
        src: this.src
      },
      this.transform.concat((data, next) => {
        let body = isBrowser
          ? renderInBrowser(data.Component, data.props)
          : renderInNode(data.Component, data.props);
    
        if (callback) {
          callback(null, body, data);
        }
      }),
      onError
    );
  }

};

function renderInBrowser(Component, props) {
  return React.render(<Component { ...props } />, document);
};

function renderInNode(Component, props) {
  return '<!DOCTYPE html>' + React.renderToString(<Component { ...props } />);
};