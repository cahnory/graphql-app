import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import { nodeField }    from '../interface';
import { getUser, getViewer }    from '../../database/action';
import { GraphQLViewer, GraphQLUser }  from './index';

export const GraphQLRootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLViewer,
      resolve: (_, data, {rootValue}) => getViewer(rootValue.ctx)
    },
    user: {
      type: GraphQLUser,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (_, {id}) => getUser(id)
    },
    node: nodeField
  },
});