import koa from 'koa';
import boot from './boot';
import config from './config';

const app = koa();
app.config = config;

if (require.main === module) { 
  boot(app, config);
}

export default app;