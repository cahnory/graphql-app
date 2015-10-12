export default function boot(app, config) {
  let mount = (moduleName) => {
    let moduleMount = require('./' + moduleName);
  
    return () => {
      console.log('MOUNT ' + moduleName);
      return moduleMount(app);
    };
  };
  
  (new Promise((resolve, reject) => {
    console.log('BOOT START');
    resolve(app);
  }))
  .then(mount('http'))
  .then(mount('render'))
  .then(mount('assets'))
  .then(mount('graphql'))
  .then(mount('waterline'))
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
}