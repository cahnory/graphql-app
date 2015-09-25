import React from 'react';
import { createMemoryHistory, createHistory } from 'history';

const ukey = 'if_you_set_this_var_its_really_because_you_wanted_me_to_suffer__love__cahnory';

// until now this is specific to browserify
var isBrowser = process.browser;
var glob = global;

export default function (Component, src, callback) {
  return isBrowser
    ? browserSideRendering(Component, src, glob[ukey], callback)
    : (state, callback) => { return serverSideRendering(Component, src, state, callback) };
};

export function browserSideRendering(Component, src, state, callback) {
  return wrapRendering(Component, src, state, () => {
    return React.render(
      <Component { ...state } />,
      document
    );
  });
}

export function serverSideRendering(Component, src, state, callback) {
  // preserve global vars to reset
  return wrapRendering(Component, src, state, () => {
    return (Component.doctype || '<!DOCTYPE html>') + React.renderToString(
      <Component { ...state } />
    );
  });
}

export function wrapRendering(Component, src, state, renderer) {
  // preserve global vars to reset
  var prev = glob[ukey];
  var output;

  // set state and src in global scope
  glob[ukey] = {
    state: state,
    src: src,
    history: isBrowser ? createHistory() : createMemoryHistory()
  };
  glob[ukey].history.pushState(state, state.location);

  output = renderer(Component, src, state);

  // restore vars
  glob[ukey] = prev;

  return output;
};

export class Isomorph extends React.Component {
  render() {
    return <div>
      <script dangerouslySetInnerHTML={{ __html: ukey + '=' + JSON.stringify(glob[ukey].state) }}></script>
      <script src={ glob[ukey].src }></script>
    </div>;
  }
};

export function getHistory() {
  return glob[ukey].history;
}