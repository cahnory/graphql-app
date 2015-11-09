import Nunjucks from 'nunjucks';

export default function (app) {
  let nunjucks = Nunjucks.configure(
    __dirname + '/../view/templates',
    {}
  );
  let serve = require(__dirname + '/../view/server');

  app.use(function * (next) {
    yield next;

    if (!this.originalUrl.match(/^\/assets\//)) {
      if (!this.query.render) {
        this.body = this.body || nunjucks.render(
          'index.html',
          {
            scripts: [
              '/assets/js/common.js',
              '/assets/js/bundle.js'
            ],
            app: 'app is loading'
          }
        );
      } else {
        serve.bind(this)((res) => {
          if (undefined !== res.body) {
            this.body = this.body || nunjucks.render(
              'index.html',
              {
                scripts: [
                  '/assets/js/common.js',
                  '/assets/js/bundle.js'
                ],
                app: res.body
              }
            );
          } else if (res.error) {
            this.status = res.error;
          } else if (res.redirect) {
            this.redirect(302, res.redirect);
          } else {
            this.status = 404;
          }
        });
      }
      yield next;
    }
  });
}