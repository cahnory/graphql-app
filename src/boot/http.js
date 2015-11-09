import etag     from 'koa-etag';
import gzip     from 'koa-gzip';
import serve    from 'koa-static';
import session  from 'koa-generic-session';

export default function (app) {
  app.keys = app.config.keys;

  app
    .use(gzip())
    .use(etag())
    .use(session())
    .use(serve(app.config.publicPath))
    .use(function * (next) {
      if (this.req.method === 'POST') {
        this.session.count = (this.session.count || 0) + 1;
        console.log(this.request, this.session.count);
      }
      yield next;
    });
}