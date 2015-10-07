import Nunjucks from 'nunjucks';

export default function (app) {
  let nunjucks = Nunjucks.configure(
    __dirname + '/../view/templates',
    {}
  );

  app.use(function * (next) {
    yield next;

    if (!this.originalUrl.match(/^\/assets\//)) {
      this.body = this.body || nunjucks.render(
        'index.html',
        {
          scripts: [
            '/assets/js/common.js',
            '/assets/js/bundle.js'
          ],
          app: 'Application is loading…'
        }
      );
    }
  
    yield next;
  });
}