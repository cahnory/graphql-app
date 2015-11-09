import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import { nodeInterface } from '../interface';

export const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    title: {
      type: GraphQLString,
      resolve: ({title}) => title,
    },
    status: {
      type: GraphQLString,
      resolve: ({status}) => status,
    }
  },
  interfaces: [nodeInterface]
});