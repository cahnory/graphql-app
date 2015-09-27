import fs from 'fs';
import path from 'path';
import browserify from 'browserify';
import babelify from 'babelify';

export default function () {
  return middleware({
    root: './src/view/documents',
    prefix: '/assets/js',
    debug: process.env.NODE_ENV !== 'production',
    production: process.env.NODE_ENV === 'production',
    transform: [babelify],
    extensions: ['.js', '.jsx', '.json']
  });
}

export function middleware(opts) {
  opts = opts || {root: opts};

  var root = path.resolve(opts.root || '.');
  var prefix = opts.prefix || '/';
  var buffers = {};

  return function * (next) {
    var url = path.relative(prefix, this.originalUrl);
    var src = path.resolve(path.join(root, url));
    var res;

    // file not found  
    if (!fs.existsSync(src)) {
      yield next;
    } else {
      // first call
      if (!buffers.hasOwnProperty(src)) {
        res = browserify(src, opts)
        .bundle((err, buffer) => {
          buffers[src] = buffer;
        });

      // file cached in memory
      } else {
        res = buffers[src];
      }

      // output
      this.type = 'text/javascript';
      this.body = res;
    }
  };
}