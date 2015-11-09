import GraphQLAddTodoMutation               from './AddTodo';
import GraphQLRenameTodoMutation            from './RenameTodo';
import GraphQLRemoveTodoMutation            from './RemoveTodo';
import GraphQLRemoveCompletedTodosMutation  from './removeCompletedTodos';

import { GraphQLObjectType } from 'graphql';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: GraphQLAddTodoMutation,
    //changeTodoStatus: GraphQLChangeTodoStatusMutation,
    //markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  },
});

export default Mutation;
export {
  Mutation,
  GraphQLAddTodoMutation,
  GraphQLRenameTodoMutation,
  GraphQLRemoveTodoMutation,
  GraphQLRemoveCompletedTodosMutation
};