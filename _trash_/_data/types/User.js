import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql/type';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id:{
      type: new GraphQLNonNull(GraphQLID)
    },
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

export const emptyUser = {
  username: 'anonymous',
  email: ''
}