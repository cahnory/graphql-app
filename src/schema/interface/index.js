import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import {
  GraphQLUser,
  GraphQLViewer
} from '../type';

import {
  getUser,
  getViewer
} from '../../database/action';

let types = [
  {name: 'User', type: GraphQLUser, getter: getUser},
  {name: 'Viewer', type: GraphQLViewer, getter: getViewer}
];

export const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    console.log(globalId, id);
    return types
      .filter((t) => type === t.name)
      .map((t) => t.getter(id))
      [0] || null;
  },
  (obj) => types
    .filter((t) => obj instanceof t.type)
    .map((t) => t.type)
    [0] || null
);