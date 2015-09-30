import koa    from 'koa';
import etag   from 'koa-etag';
import gzip   from 'koa-gzip';
import router from 'koa-router';
import serve  from 'koa-static';

import graphql    from './http/graphql';
import sass       from './http/sass';
import view       from './http/view';
import webpack    from './http/webpack';

const app = koa();
const httpdoc = __dirname + '/../public';
const styles  = '/assets/css';


app
.use(gzip())
.use(etag())
.use(serve(httpdoc))
.use(sass({
  src:    __dirname + '/styles/',
  dest:   httpdoc + styles,
  prefix: styles
}))
.use(webpack(require('../webpack.config.dev.babel')))
.use(router().get('/graphql', graphql()).routes())
.use(view());

try {
  app.listen(1337);
  console.log('listening on port 1337');
} catch (e) {
  console.log(e);
  process.exit();
}