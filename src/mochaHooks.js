const mongoose = require('mongoose');
const redis = require('./redisConnection');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

exports.mochaHooks = {
  beforeAll(done) {
    const random = Math.random().toString();
    redis
      .getRedisConnection()
      .then((redisClient) => redisClient.set('random', random))
      .then(() => done());
  },
  afterAll(done) {
    redis
      .getRedisConnection()
      .then((redisClient) => redisClient.del('random'))
      .then(() => done());
  },
};
