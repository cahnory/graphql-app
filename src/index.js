import koa    from 'koa';
import router from 'koa-router';
import serve  from 'koa-static';

import browserify from './http/browserify';
import graphql    from './http/graphql';
import isomorph   from './http/isomorph';
import sass       from './http/sass';

const app = koa();
const httpdoc = __dirname + '/../public';
const styles  = '/assets/css';


app
.use(serve(httpdoc))
.use(sass({
  src:    __dirname + '/styles/',
  dest:   httpdoc + styles,
  prefix: styles
}))
.use(router().get('/graphql', graphql()).routes())
.use(router().get('/assets/js/:filename', browserify()).routes())
.use(isomorph({
  src: 'main',
  cwd: __dirname + '/view/documents',
  prefix: '/assets/js'
}));

try {
  app.listen(1337);
  console.log('listening on port 1337');
} catch (e) {
  console.log(e);
  process.exit();
}