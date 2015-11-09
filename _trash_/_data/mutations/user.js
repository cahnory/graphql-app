import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';
import { mutationWithClientMutationId } from 'graphql-relay';

import ViewerType from '../types/Viewer';
import passport from 'koa-passport';
import co from 'co';

export const userLogin = mutationWithClientMutationId({
  name: 'ToggleWidgetEnable',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    widget: {
      type: ViewerType,
      resolve: (payload) => {console.log(payload); return payload;}
    }
  },
  mutateAndGetPayload: ({username, password}, {rootValue}) => {
    // attach username and password to the query
    // in order to get passport find them
    rootValue.ctx.query.username = username;
    rootValue.ctx.query.password = password;

    // Authenticate viewer
    return new Promise((resolve, reject) => {
      co(passport.authenticate('local', function * fooBar(err, account) {
        if (err) {
          return reject(err);
        }
        if (!account) {
          return reject('bad pass');
        }

        rootValue.ctx.req.login(account, (err) => {
          if (err) {
            return reject(err);
          }
          rootValue.ctx.session.viewer = { account };
          return resolve(rootValue.ctx.session.viewer);
        });
      })
      .bind(rootValue.ctx));
    });
  }
});
/*
export const userLogin = {
  type: ViewerType,
  description: "Login user",
  args: {
    input: {
      type: new GraphQLNonNull(new GraphQLInputObjectType({
        name: 'credential',
        fields: {
          //clientMutationId: {type: GraphQLString},
          username: {type: new GraphQLNonNull(GraphQLString)},
          password: {type: new GraphQLNonNull(GraphQLString)}
        }
      }))
    }
  },
  resolve: (source, {username, password}, {rootValue}) => {
    rootValue.ctx.query.username = username;
    rootValue.ctx.query.password = password;

    return new Promise((resolve, reject) => {
      co(passport.authenticate('local', function * fooBar(err, account) {
        if (err) {
          return reject(err);
        }
        if (!account) {
          return reject('bad pass');
        }

        rootValue.ctx.req.login(account, (err) => {
          if (err) {
            return reject(err);
          }
          console.log({ account });
          return err ? reject(err) : resolve({ account });
        });
      })
      .bind(rootValue.ctx));
    });
  }
}
*/
export const userLogout = {
  type: ViewerType,
  description: "Logout user",
  resolve: (source, {}, {rootValue}) => {
    rootValue.ctx.req.logout();
    return null;
  }
}