import koa from 'koa';
import router from 'koa-router';

import graphql from './app/graphql';
import browserify from './app/browserify';
import renderer from './app/renderer';

var app = koa();


app
.use(router().get('/graphql', graphql()).routes())
.use(router().get('/assets/js/:filename', browserify()).routes())
.use(renderer());

try {
  app.listen(1337);
  console.log('listening on port 1337');
} catch (e) {
  console.log(e);
  process.exit();
}