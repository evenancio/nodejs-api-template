import mongoose from 'mongoose';
import redis from './redisConnection';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';
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
