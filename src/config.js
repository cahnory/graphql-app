export default {
  http: {
    port: 1337
  },
  publicPath: __dirname + '/../public',

  keys: ['a secret key', 'and another one'],

  waterline: {

    adapters: {
      mysql: require('sails-mysql')
    },
    connections: {
      mysql: {
        adapter   : 'mysql',
        host      : 'localhost',
        port      : 3306,
        user      : 'root',
        password  : '',
        database  : 'graphqlapp'
      }
    },
    
    //models: {
    //  connection: 'mysql'
    //},

    defaults: {
      migrate: 'alter'
    }
  }
};