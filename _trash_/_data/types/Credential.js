import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

export default new GraphQLObjectType({
  name: 'Credential',
  fields: () => ({
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});