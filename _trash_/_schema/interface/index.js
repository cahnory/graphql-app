import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import {
  GraphQLTodo,
  GraphQLUser
} from '../type';

import {
  getTodo,
  getUser
} from '../actions';

export const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Todo') {
      return getTodo(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof GraphQLTodo) {
      return GraphQLTodo;
    } else if (obj instanceof GraphQLUser) {
      return GraphQLUser;
    }
    return null;
  }
);