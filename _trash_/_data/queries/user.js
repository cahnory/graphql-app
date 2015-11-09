import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';

import {
  default as UserType,
  emptyUser
} from '../types/User';

import ViewerType from '../types/Viewer';

export const viewer = {
  type: ViewerType,
  resolve: (parent, {}, {rootValue}) => {
    return {account: rootValue.ctx.req.user};
  }
};

export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  resolve: (parent, {id}, {rootValue}) => {
    return rootValue.app.models.user.findOne({ id });
  }
};


/*
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
},
users: {
  type: new GraphQLList(UserType),
  resolve: (root) => {
    return app.models.user.find();
  }
}
*/