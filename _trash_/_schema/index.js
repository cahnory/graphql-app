import {
  GraphQLAddTodoMutation,
  GraphQLChangeTodoStatusMutation,
  GraphQLMarkAllTodosMutation,
  GraphQLRemoveCompletedTodosMutation,
  GraphQLRemoveTodoMutation,
  GraphQLRenameTodoMutation,
} from './mutation';

import {
  GraphQLSchema
} from 'graphql';

import { GraphQLRoot } from './type';
import { Mutation } from './mutation'

const Schema = new GraphQLSchema({
  query: GraphQLRoot,
  mutation: Mutation
});

export default Schema;