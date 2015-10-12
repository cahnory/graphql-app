import getBabelRelayPlugin from 'babel-relay-plugin';

let schema = require('./src/data/schema.json');

export default getBabelRelayPlugin(schema.data);