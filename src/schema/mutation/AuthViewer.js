import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLViewer } from '../type';
import {
  authViewer
} from '../../database/action';

export const AuthViewerMutation = mutationWithClientMutationId({
  name: 'AuthViewer',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    viewer: {
      type: GraphQLViewer,
      resolve: payload => payload
    }
  },
  mutateAndGetPayload: ({username, password}, {rootValue}) => {
    // attach username and password to the query
    // in order to get passport find them
    rootValue.ctx.query.username = username;
    rootValue.ctx.query.password = password;

    // Authenticate viewer
    return authViewer(rootValue.ctx);
  }
});