import app from '../../';
const VIEWER_ID = 1;

import Todo from '../../database/model/Todo';

export function getUser(id) {
  app.models.user.findOne({id});
}
export function getUsers() {
  app.models.user.findOne();
}

export function getTodo(id) {
  app.models.todo.findOne({id});
}
export function getTodos() {
  app.models.todo.find();
}
export function addTodo(title) {
  return app.models.user.create({
    title: title,
    status: 'incomplete'
  });
}
export function renameTodo(id, title) {
  return app.models.todo.update({id}, {title});
}
export function removeTodo(id) {
  return app.models.todo.destroy({id});
}
export function removeCompletedTodos() {
  // TODO: filter by viewer
  return app.models.todo.destroy({
    status: 'completed'
  });
}

export function getViewer() {
  return getUser({id: VIEWER_ID});
}