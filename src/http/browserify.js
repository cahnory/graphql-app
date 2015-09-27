import fs from 'fs';
import path from 'path';
import browserify from 'browserify';
import babelify from 'babelify';
import uglifyify from 'uglifyify';

const PROD_ENV = process.env.NODE_ENV === 'production';

export default function () {
  return middleware({
    root: './src/view/documents',
    prefix: '/assets/js',
    transform: [babelify],
    extensions: ['.js', '.jsx', '.json'],
    minify: true
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

  options.production = defaultOption(options.production, !PROD_ENV);
  options.debug = defaultOption(options.debug, !options.production);
  options.minify = defaultOption(options.minify, options.production);
  options.transform = arrayOption(options.transform);

  if (options.minify) {
    options.transform.push(uglifyify)
  }

  return options;
}

function defaultOption(option, alt) {
  return option !== undefined ? option : alt;
}
function arrayOption(option, alt = []) {
  return [].concat(option || alt);
}