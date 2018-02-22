const MongooseConfig = require('./src');

const mongooseConfig = new MongooseConfig({});

console.log(mongooseConfig.config);
