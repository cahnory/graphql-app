import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObject
} from 'graphql/type';

import UserType from './User';
import CredentialType from './Credential';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    clientMutationId: {type: GraphQLString },
    credential: { type: CredentialType },
    account: {
      type: UserType,
      description: 'The user account of the user if has one.'
    }
  })
});