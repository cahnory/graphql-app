import koa    from 'koa';
import config from './config';

const app = koa();
app.config = config;

let boot = (name) => {
  let bootModule = require('./boot/' + name);

  return () => {
    console.log('BOOT ' + name);
    return bootModule(app);
  }
};

(new Promise((resolve, reject) => {
  console.log('BOOT START');
  resolve(app);
}))
.then(boot('http'))
.then(boot('assets'))
.then(boot('graphql'))
.then(boot('waterline'))
.then(() => {
  console.log('BOOT END');
  return new Promise((resolve, reject) => {
    try {
      app.listen(app.config.http.port);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
})
.then(()=> {
  console.log('listening on port ' + app.config.http.port);
})
.catch((err) => {
  console.trace(err);
  process.exit();
});

export default app;