// fix relay on server
require('fs').writeFileSync(
  './node_modules/react-relay/node_modules/fbjs/lib/fetch.js',
  'module.exports = require(\'isomorphic-fetch\');'
);