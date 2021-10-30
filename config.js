require('dotenv').config();

module.exports = {
  mongoDbConnectionString: process.env.MONGODB_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secretOrPrivateKey',
  redisUrl: process.env.REDISCLOUD_URL,
};
