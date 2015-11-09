import {
  AddUserMutation,
  AuthViewerMutation
} from '../mutation';

import { GraphQLObjectType } from 'graphql';

export const GraphQLRootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: AddUserMutation,
    authViewer: AuthViewerMutation
  },
});