import Waterline from 'waterline';

export default Waterline.Collection.extend({

  // Define table
  identity: 'user',
  tableName: 'user',
  connection: 'mysql',

  // Define attributes
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    }
  }

});