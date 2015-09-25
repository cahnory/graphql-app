import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql/type';

import User from './User';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: User
      }
    }
  })
});