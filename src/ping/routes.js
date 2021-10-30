const PingController = require('./controller');

module.exports = (app) => {
  app.get('/ping', PingController.hello);
  app.get('/ping/mongo', PingController.mongo);
  app.get('/ping/redis', PingController.redis);
};
