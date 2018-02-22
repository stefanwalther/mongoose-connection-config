const extend = require('extend');
const DEFAULT_CONFIG = require('./default-config');

class MongooseConnectionConfig {

  /**
   * Initialize a new mongoose-config.
   *
   * @name .constructor()
   * @constructor
   * @param {Configuration} config - Configuration options overriding the default ones.
   * @api public
   */
  constructor(config) {
    this.config = extend(this.DEFAULT_CONFIG, config);
  }

  /**
   * Default configuration options.
   *
   * @returns {{debug: boolean, host: string, port: number, database: string, connectOptions: {db: {}, server: {auto_reconnect: boolean, socketOptions: {keepAlive: number, connectTimeoutMS: number}}, replset: {socketOptions: {keepAlive: number, connectTimeoutMS: number}}, user: {}, pass: {}, auth: {}, mongos: {}}}}
   *
   * @api public
   */
  get DEFAULT_CONFIG() {
    return DEFAULT_CONFIG;
  }


  getMongoUri() {
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
