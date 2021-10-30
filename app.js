const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const expressSanitizer = require('express-sanitizer');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');
const { logger } = require('./src/logger');
const redis = require('./src/redisConnection');
const { json } = require('body-parser');

dotenv.config();
const app = express();
// Enable CORS for *
app.use(cors());
// Only allows json on Body
app.use(json());
app.use(expressSanitizer());
app.use(morgan('combined', { stream: logger.stream.write }));
// Enable GZIP
app.use(compression());
// Enable JWT
app.use(
  jwt({
    secret: config.jwtSecretKey,
    algorithms: ['RS256'],
  })
    // exception routes
    .unless({
      path: [/\/ping*/],
    })
);

// Connect to MongoDb
mongoose.Promise = global.Promise;
const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URL
    : `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${
        process.env.MONGODB_HOST || 'localhost'
      }:27017`;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.pluralize(null);

// Requests Interceptor
app.use(function (err, req, res, next) {
  // Custom message whenever the token is invalid.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
    const bodyRequest = req.body;
    let logMessage = `${err.status || 500} - ${res.statusMessage} - ${
      err.message
    } - ${req.originalUrl} - ${req.method} - ${req.ip}`;

    if (req.user && req.user.id) {
      logMessage += ` - USERID ${req.user.id}`;
    }

    if (req.headers && req.headers.authorization) {
      logMessage += ` - TOKEN ${req.headers.authorization}`;
    }

    if (bodyRequest) {
      logMessage += ` - REQUEST ${JSON.stringify(bodyRequest)}`;
    }

    logger.error(logMessage);
  }
});

// Register all routes
require('./src/routesRegister')(app);

module.exports = app;
