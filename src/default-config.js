
module.exports = {
  debug: false,
  host: 'localhost',
  port: 27017,
  database: '',
  connectOptions: {
    db: {},
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    user: {},
    pass: {},
    auth: {},
    mongos: {}
  }
};
