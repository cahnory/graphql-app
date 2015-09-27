import Middleware from 'node-sass-middleware';

const PROD_ENV = process.env.NODE_ENV === 'production';
console.log(PROD_ENV);

export default function (options = {}) {
  // convert src to options object
  if ('string' === typeof options) {
    options = {
      src: options
    };
  }

  // comporessed style in prod by default
  if (!options.hasOwnProperty('outputStyle')) {
    options.outputStyle = PROD_ENV ? 'compressed' : 'expanded';
  }

  // don't debug in prod by default
  if (!options.hasOwnProperty('debug')) {
    options.debug = !PROD_ENV;
  }

  let middleware = Middleware(options);
  return function *(next) {
      yield middleware.bind(middleware, this.req, this.res);
      yield next;
  };
};