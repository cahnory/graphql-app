import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { globalKey, isBrowser, asyncLoop } from './utils';
import isomorphTransform from './transform/isomorph';

export default class Isomorph {

  constructor(Component, options) {
    options = options || {};
    this.Component = Component;
    this.transform = [isomorphTransform()].concat(options.transform || []);

    if (isBrowser) {
      this.render(
        isomorphTransform.getSrc(),
        location.pathname + location.search + location.hash,
        isomorphTransform.getProps()
      );
    }
  }

  render(src, location, props, callback, onError) {
    asyncLoop(
      {
        Component: this.Component,
        props: props,
        location: '' + location,
        src: src
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

}

function renderInBrowser(Component, props) {
  return ReactDOM.render(<Component { ...props } />, document);
}

function renderInNode(Component, props) {
  return '<!DOCTYPE html>' + ReactDOMServer.renderToString(<Component { ...props } />);
}