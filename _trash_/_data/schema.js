import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql/type';

import {
  viewer,
  user
} from './queries/user';

import {
  userLogin,
  userLogout
} from './mutations/user';

import app from '../index';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({viewer, user})
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutations',
    fields: () => ({userLogin, userLogout})
  })
});