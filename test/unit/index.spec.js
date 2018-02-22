const MongooseConnectionConfig = require('./../../src');
const defaultConfig = require('./../../src/default-config');

describe('mongoose-connection-config', () => {

  describe('has an API which', () => {

    it('exposes has a ctor', () => {
      expect(MongooseConnectionConfig)
        .to.have.a.property('prototype')
        .to.have.a.property('constructor')
        .to.be.a('function');
    });

    it('exposes has a function getMongoUri()', () => {
      let mcc = new MongooseConnectionConfig();
      expect(mcc).to.have.a.property('getMongoUri').to.be.a('function');
    });

    it('exposes DEFAULT_CONFIG', () => {
      let mcc = new MongooseConnectionConfig();
      expect(mcc).to.have.a.property('DEFAULT_CONFIG').to.exist;
      expect(mcc.DEFAULT_CONFIG).to.be.equal(defaultConfig);
    });

    it('DEFAULT_CONFIG is readOnly', () => {
      let mcc = new MongooseConnectionConfig();
      mcc.DEFAULT_CONFIG.host = 'newhost';

      expect(mcc.DEFAULT_CONFIG).to.have.a.property('host').to.be.equal(defaultConfig.host);
    })
  });

  describe('ctor', () => {

   it('allows to pass in config params which overwrite the default ones', () => {
      let mcc = new MongooseConnectionConfig({host: 'sub.mydomain'});
      expect(mcc.config).to.have.a.property('host').to.be.equal('sub.mydomain');
    });

    it('falls back to default configs, if not passed in', () => {
      let mcc = new MongooseConnectionConfig({host: 'sub.mydomain'});
      expect(mcc.config).to.have.a.property('port').to.be.equal(27017);
    });
  })

  describe('When building a connection', () => {

    it('_getMongoUri_UserPwd => returns and empty string by default', () => {
      const mcc = new MongooseConnectionConfig();
      expect(mcc._getMongoUri_UserPwd()).to.be.equal('');
    });

    it('_getMongoUri_UserPwd => returns and empty string if only either username or password is set', () => {
      const mcc = new MongooseConnectionConfig();
      mcc.config.username = 'foo';
      expect(mcc._getMongoUri_UserPwd()).to.be.equal('');
      mcc.config.username = '';
      mcc.config.password = 'bar';
      expect(mcc._getMongoUri_UserPwd()).to.be.equal('');
    });

    it('_getMongoUri_UserPwd => returns the user-pwd', () => {
      const mcc = new MongooseConnectionConfig();
      mcc.config.username = 'foo';
      mcc.config.password = 'bar';
      expect(mcc._getMongoUri_UserPwd()).to.be.equal('foo:bar@');
    });

    it('_getMongoUri_Database => returns an empty string by default', () => {
      const mcc = new MongooseConnectionConfig();
      mcc.config.database = '';
      expect(mcc._getMongoUri_Database()).to.be.equal('');
    });

    it('_getMongoUri_Database => returns the database as defined', () => {
      const mcc = new MongooseConnectionConfig();
      mcc.config.database = 'foobarbaz';
      expect(mcc._getMongoUri_Database()).to.be.equal('/foobarbaz');
    });

  })

});
