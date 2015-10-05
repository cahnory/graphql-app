import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql/type';

import UserType from './User';
import UserModel from '../models/User';

import app from '../index';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}) => {
          return app.models.user.findOne({ id: id });
        }
      }
    }
  })
});