import app from './app.js';
import { logger } from './src/logger.js';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Running on port ${port}.`);
});

export default app;
