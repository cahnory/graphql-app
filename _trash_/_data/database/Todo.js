import Waterline from 'waterline';

export default Waterline.Collection.extend({

  // Define table
  identity: 'todo',
  tableName: 'todo',
  connection: 'mysql',

  // Define attributes
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      required: true
    }
  },

});