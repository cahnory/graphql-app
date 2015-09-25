import defaultApp from '../view/documents/main';

export default function (opts) {
  opts = opts || {
    state: {
      routes: {},
      foo: 'bar'
    }
  };
  opts.state  = opts.state || opts.state; 

  return function * (next) {
    // set context object
    this.renderer = {
      app: defaultApp,
      state: JSON.parse(JSON.stringify(opts.state))
    };

    // default location (useful for routers)
    this.renderer.state.location = this.renderer.state.location || this.originalUrl; 

    yield next;

    this.type = 'text/html; charset=utf-8';
    this.body = this.renderer.app(this.renderer.state);
  }
}