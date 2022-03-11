import glob from 'glob';
import redis from './redisConnection';
const connection = redis.getSyncRedisConnection();

module.exports = () => {
  glob('src/**/scheduler.js', (err, files) => {
    files.forEach((file) => {
      if (file.substr(-3, 3) === '.js') {
        const functions = require(`./${file.substr(4).replace('.js', '')}`);
        for (func in functions) {
          console.log(func);
          functions[func](connection);
        }
        console.log(functions);
      }
    });
  });

  glob('src/**/worker.js', (err, files) => {
    files.forEach((file) => {
      if (file.substr(-3, 3) === '.js') {
        const functions = require(`./${file.substr(4).replace('.js', '')}`);
        for (func in functions) {
          console.log(func);
          functions[func](connection);
        }
        console.log(functions);
      }
    });
  });
};
