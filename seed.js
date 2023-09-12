const client = require('./db/client');
const { rebuildDB } = require('./newData');

rebuildDB().catch(console.error).finally(() => client.end());