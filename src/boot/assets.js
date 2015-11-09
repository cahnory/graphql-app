//import sass       from '../middlewares/sass';
import webpack    from '../middlewares/webpack';

export default function (app) {
  app/*
  .use(sass({
    src:    __dirname + '/../styles/',
    dest:   app.config.publicPath + '/assets/css',
    prefix: '/assets/css'
  }))*/
  .use(webpack(require('../../webpack.config.dev.babel')));
}