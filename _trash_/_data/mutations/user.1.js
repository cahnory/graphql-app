import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';

import UserType from '../types/User';
import passport from 'koa-passport';

export const userLogin = {
  type: UserType,
  description: "Login user",
  args: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (source, {username, password}, {rootValue}) => {
    rootValue.ctx.query.username = username;
    rootValue.ctx.query.password = password;

    return new Promise((resolve, reject) => {
      passport.authenticate('local', function * (err, account) {
        if (err || !account) {
          return reject(err);
        }

        rootValue.req.login(account, (err) => {
          return err ? reject(err) : resolve(account);
        });
      }).call(rootValue.ctx);
    });
  }
}