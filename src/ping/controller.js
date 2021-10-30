const PingService = require('./service');
const { logger } = require('../logger');

module.exports = {
  async hello(req, res) {
    try {
      const msg = await PingService.hello();
      res.send(msg);
    } catch (ex) {
      logger.error(ex);
      res.send(401);
    }
  },

  async mongo(req, res) {
    try {
      const msg = await PingService.mongo();
      res.send(msg);
    } catch (ex) {
      logger.error(ex);
      res.send(401);
    }
  },

  async redis(req, res) {
    try {
      const msg = await PingService.redis();
      res.send(msg);
    } catch (ex) {
      logger.error(ex);
      res.send(401);
    }
  },
};
