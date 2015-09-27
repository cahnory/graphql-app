import DefaultDocument from '../view/documents/main';

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
      app: DefaultDocument,
      state: JSON.parse(JSON.stringify(opts.state))
    };

    yield next;

    
    this.renderer.app.render(
      this.renderer.state,
      this.originalUrl,
      (error, body, data) => {
        if (error) {
          console.log(error, body, data);
        }

        this.type = 'text/html; charset=utf-8';
        this.body = body;
        this.status = data.status || this.status;
      });
  }
}