const MongooseConnectionConfig = require('../src/index.js');

const opts = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: 'my-db'
};
const mcc = new MongooseConnectionConfig(opts);

console.log(mcc.getMongoUri());
