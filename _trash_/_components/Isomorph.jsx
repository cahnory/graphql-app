import React from 'react';
import ReactDOM from 'react-dom';
const globalKey = 'some_key';

export default function createComponent(Component) {
  class IsoMorphComponent extends IsoMorph {
    constructor() {
      super();
      this.Component = Component;
    }
  }

  autorender(IsoMorphComponent);

  return IsoMorphComponent;
}

export default function createComponentFromElement(element) {
  class IsoMorphElement extends IsoMorph {
    render() {
      return <div>{ element }{ this.props.children }</div>;
    }
  }

  return createComponent(IsoMorphElement);
}

export class IsoMorph extends React.Component {

  componentWillMount() {
    this.setState(global[globalKey] ? global[globalKey] : this.props);
  }

  render() {
    let {state} = this.state;

    return <this.Component {...state}>
      { this.props.children }
      { this.renderState() }
      { this.renderScript() }
    </this.Component>;
  }

  renderState() {
    if (!this.state.rendered) {
      return <script dangerouslySetInnerHTML={{
      __html: 'var ' + globalKey + '=' + JSON.stringify(this.state)
      }}></script>;
    }
  }

  renderScript() {
    let {src} = this.state;
  
    if (!this.state.rendered) {
      return <script src={ src }></script>;
    }
  }
}

function autorender (Component) {
  let state = global[globalKey];
  // will get props from global
  if (process.browser && state.selector && !global[globalKey + '_rendered']) {
    global[globalKey + '_rendered'] = true;
    ReactDOM.render(<Component {...state} rendered={ true } />, document.querySelector(state.selector));
  }
}