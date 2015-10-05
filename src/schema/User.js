import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql/type';

let count = 0;

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'The public name of the member.'
    },
    email: {
      type: GraphQLString,
      description: 'The email of the member.'
    }
  })
});