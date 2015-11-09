import { GraphQLSchema } from 'graphql';
import {
  GraphQLRootQuery,
  GraphQLRootMutation
} from './type';

export default new GraphQLSchema({
  query: GraphQLRootQuery,
  mutation: GraphQLRootMutation
});