const DEFAULT_CONFIG = require('./default-config');

/**
 * @class MongooseConnectionConfig
 * @name MongooseConnectionConfig
 *
 * @api public
 */
class MongooseConnectionConfig {

  /**
   * Define a configuration object to pass to the constructor.
   *
   * If no options are defined, the default options will be used:
   *
   *
   * ```js
   * // Default Options:
   * const defaultOpts = {
   *    debug: false,
   *    host: 'localhost',
   *    port: 27017,
   *    database: '',
   *    connectOptions: {
   *      db: {},
   *      server: {
   *        auto_reconnect: true
   *      },
   *      replset: {},
   *      user: {},
   *      pass: {},
   *      auth: {},
   *      mongos: {}
   *    }
   * };
   * ```
   * See [index.js => DEFAULT_CONFIGURATION](index.js) for more information about the current default options.
   *
   *
   * @name Configuration
   *
   * @param {Object} `opts` - Options to pass in.
   * @param {String} `opts.connection_string - Full connection string which will then be returned, ignoring all other options.
   * @param {Boolean} `opts.debug` - Whether MongoDB runs in debug mode or not.
   * @param {String} `opts.host` - The MongoDBhost, defaults to `localhost`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {Number} `opts.port` - The MongoDB port, defaults to `27017`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {String} `opts.database` - The MongoDB database, defaults to `admin`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {Object} `opts.connectOptions` - The MongoDB connection properties, being passed through to the native MongoDB driver. See [mongoose' documentation](http://mongoosejs.com/docs/connections.html), resp. [MongoDB's native driver for node.js' documentation](https://github.com/mongodb/node-mongodb-native) for more details.
   *
   * @api public
   */

  /**
   * Initialize a new MongooseConnectionConfig.
   *
   * Basic Example:
   *
   * ```js
   * const MongooseConnectionConfig = require('./src');
   *
   * const opts = {
   *   host: process.env.MONGO_HOST || 'localhost',
   *   port: process.env.MONGO_PORT || 27017,
   *   database: 'my-db'
   * };
   * const mcc = new MongooseConnectionConfig(opts);
   *
   * console.log(mcc.getMongoUri()); // => mongodb://localhost:27017/my-db   *
   * ```
   *
   * @name .constructor()
   * @constructor
   * @param {Configuration} config - Configuration options overriding the default ones.
   * @api public
   */
  constructor(config) {
    this.config = Object.assign(Object.assign({}, this.DEFAULT_CONFIG), config);
  }

  /**
   * Default configuration options.
   *
   * Example:
   *
   * ```js
   * const MongooseConnectionConfig = require('./../src');
   *
   * let mongooseConnectionConfig = new MongooseConnectionConfig();
   * console.log(mongooseConnectionConfig.DEFAULT_CONFIG);
   * ```
   *
   * @returns {Object}
   *
   * @api public
   */
  get DEFAULT_CONFIG() {
    return DEFAULT_CONFIG;
  }

  set DEFAULT_CONFIG(value) {
    throw new Error(`The readOnly property cannot be written. ${value} was passed.`);
  }

  /**
   * Get the connection string.
   * @returns {string}
   * @api public
   */
  getMongoUri() {

    if (this.config.connection_string) {
      return this.config.connection_string;
    }

    let c = 'mongodb://';
    c += this._getMongoUri_UserPwd();
    c += this._getMongoUri_Hosts();
    c += this._getMongoUri_Database();
    return c;
  }

  _getMongoUri_UserPwd() {
    return (this.config.username && this.config.password) ? this.config.username + ':' + this.config.password + '@' : '';

  }

  _getMongoUri_Hosts() {
    // Todo: Allow multiple hosts according to https://docs.mongodb.com/manual/reference/connection-string/
    return this.config.host + ':' + this.config.port;
  }

  _getMongoUri_Database() {
    return (this.config.database) ? `/${this.config.database}` : '';
  }

}

module.exports = MongooseConnectionConfig;
