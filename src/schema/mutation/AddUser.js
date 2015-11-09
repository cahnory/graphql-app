import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLUser } from '../type';
import {
  addUser,
  getUser
} from '../../database/action';

export const AddUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email:    { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: GraphQLUser,
      resolve: ({id}) => getUser(id)
    }
  },
  mutateAndGetPayload: (input) => {
    let user = addUser(input);
    return user;
  }
});