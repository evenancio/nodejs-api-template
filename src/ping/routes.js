import PingController from './controller.js';

export default (app) => {
  app.get('/ping', PingController.hello);
  app.get('/ping/mongo', PingController.mongo);
  app.get('/ping/redis', PingController.redis);
};
