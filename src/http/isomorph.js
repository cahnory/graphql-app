import path from 'path';

export default function (opts = {}) {
  opts.src = opts.src || 'index.js';
  opts.uri = opts.uri || opts.src;
  opts.layout = opts.layout || 'index.html';

  return function * (next) {
    // set context object
    this.isomorph = {
      src: opts.src,
      state: JSON.parse(JSON.stringify(opts.state))
    };

    yield next;

    let document = require(path.join(opts.cwd, this.isomorph.src));
    
    document.render(
      path.join(opts.prefix, this.isomorph.src),
      this.originalUrl,
      this.isomorph.state,
      (error, body, data) => {
        if (error) {
          console.log(error, body, data);
        }

        this.type = 'text/html; charset=utf-8';
        this.body = body;
        this.status = data.status || this.status;
      });
  };
}