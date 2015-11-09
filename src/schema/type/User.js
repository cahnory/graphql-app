import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../interface';

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    username: {
      type: GraphQLString,
      resolve: ({username}) => username
    },
    email: {
      type: GraphQLString,
      resolve: ({email}) => email
    },
  },
  interfaces: [nodeInterface]
});