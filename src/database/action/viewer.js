import passport from 'koa-passport';
import co from 'co';

export function getViewer(ctx) {
  if (!ctx.session.viewer) {
    ctx.session.viewer = {account: null};
  }
  return ctx.session.viewer;
}

export function authViewer(ctx) {
  return new Promise((resolve, reject) => {
    co(passport.authenticate('local', function * fooBar(err, account) {
      if (err) {
        return reject(err);
      }
      if (!account) {
        return reject('bad pass');
      }

      ctx.req.login(account, (err) => {
        if (err) {
          return reject(err);
        }
        let viewer = getViewer(ctx);
        viewer.account = account.toJSON();
        return resolve(viewer);
      });
    }).bind(ctx));
  });
}