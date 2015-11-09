import app from '../../';

export function addUser(props) {
  props.newPassword = props.password;
  return app.models.user.create(props);
}

export function getUser(id) {
  console.log({id});
  return app.models.user.findOne({id});
}

export function getUsers(props) {
  return app.models.user.find(props);
}