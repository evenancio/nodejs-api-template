import redis from '../redisConnection.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';
import HelloModel from './model';
const should = chai.should();

chai.use(chaiHttp);

describe('Ping Pong: Testing if the main services are up and running', () => {
  before((done) => {
    HelloModel.remove({})
      .then(() => redis.getRedisConnection())
      .then((redisClient) => redisClient.del('PING'))
      .then(() => done());
  });

  describe('GET /ping', () => {
    it('it should GET Hello string', (done) => {
      chai
        .request(server)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('Hello');
          done();
        });
    });
  });

  describe('GET /ping/mongo', () => {
    it('it should GET the Hello object from Mongo', (done) => {
      chai
        .request(server)
        .get('/ping/mongo')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('lastDate');
          res.body.should.have.property('count').eql(1);
          done();
        });
    });
  });

  describe('GET /ping/redis', () => {
    it('it should GET the Hello object from Redis', (done) => {
      chai
        .request(server)
        .get('/ping/redis')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('count');
          res.body.should.have.property('count').eql('1');
          done();
        });
    });
  });
});
