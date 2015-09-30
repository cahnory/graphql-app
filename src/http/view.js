import _ from 'lodash';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import nunjucks from 'nunjucks';

const defaultOptions = {
  publicPath: '',
  component: {
    src: 'index',
    path: path.join(__dirname, '../view/entries'),
    key: 'app'
  },
  isomorph: {
    src: '/assets/js/bundle.js',
    selector: '#app'
  },
  state: {foo: 'bar'},
  template: {
    src: 'index.html',
    path: path.join(__dirname, '../view/templates'),
    options: { autoescape: true }
  }
};

export default function (options) {
  options = _.merge(_.cloneDeep(defaultOptions), options);

  return function * (next) {
    this.view = _.cloneDeep(options);
    yield next;

    // render component to state
    let Component = require(path.resolve(this.view.component.path, this.view.component.src));
    this.view.state[this.view.component.key] = renderComponent(Component, this.view.state, this.view.isomorph);

    this.type = 'text/html; charset=utf-8';

    // render templates
    this.body = nunjucks
      .configure(
        this.view.template.path,
        this.view.template.options
      )
      .render(
        this.view.template.src,
        this.view.state
      );
  };
}

function renderComponent(Component, state, isomorph) {
  if (isomorph) {
    state = {
      src: isomorph.src,
      selector: isomorph.selector,
      state: _.cloneDeep(state)
    };
  }
  return ReactDOMServer.renderToString(React.createElement(Component, state));
}