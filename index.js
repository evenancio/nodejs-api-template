const app = require('./app');
const { logger } = require('./src/logger');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Running on port ${port}.`);
});

module.exports = app;
