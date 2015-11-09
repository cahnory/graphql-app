import getBabelRelayPlugin from 'babel-relay-plugin';

let schema = require('./src/schema/schema.json');

export default getBabelRelayPlugin(schema.data);