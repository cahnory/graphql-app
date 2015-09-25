import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql/type';

let count = 0;

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    count: {
      type: GraphQLInt,
      resolve: function() {
        return count;
      }
    }
  }
});