import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../interface';
import { GraphQLUser }   from './User';

export const GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField('Viewer'),
    account: {
      type: GraphQLUser,
      description: 'The user account of the user if has one.'
    }
  },
  interfaces: [nodeInterface]
});