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

export function middleware(options) {
  var config = getConfig(options);
  var root = path.resolve(config.root || '.');
  var prefix = config.prefix || '/';
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
        res = browserify(src, config)
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

function getConfig(options) {
  // convert src to options object
  if ('string' === typeof options) {
    options = {
      root: options
    };
  } else if (!options || 'object' !== typeof options) {
    options = {};
  }

  return options;
}