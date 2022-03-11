import HelloModel from './model.js';
import redis from '../redisConnection.js';

export default {
  async hello() {
    return 'Hello';
  },

  async mongo() {
    const { count, lastDate } = await HelloModel.findOneAndUpdate(
      {},
      {
        $inc: { count: 1 },
        $set: { lastDate: new Date() },
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true,
      }
    );

    return { count, lastDate };
  },

  async redis() {
    const client = await redis.getRedisConnection();
    if (client) {
      const pingValue = await client.get('PING');
      if (!pingValue) {
        await client.set('PING', 1);
        return { count: '1' };
      }

      await client.incr('PING');
      const incrValue = await client.get('PING');
      return { count: incrValue };
    } else {
      return { message: 'Redis is still loading. Try again.' };
    }
  },
};
