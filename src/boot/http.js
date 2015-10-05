import etag   from 'koa-etag';
import gzip   from 'koa-gzip';
import serve  from 'koa-static';

export default function (app) {
  app
    .use(gzip())
    .use(etag())
    .use(serve(app.config.publicPath));
}