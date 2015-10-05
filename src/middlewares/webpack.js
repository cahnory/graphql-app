import connect from 'koa-connect';
import compose from 'koa-compose';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

export default function (config = {}) {
  let compiler = webpack(config);

  return compose([
    // quick fix
    function * (next) {
      this.status = 200;
      yield next;
    },
    connect(webpackDev(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })),
    connect(webpackHot(compiler))
  ]);
}