import { createClient } from 'redis';
import { config } from '../config/config';

let redisClient: any;

if (config.env === 'test') {
  console.log('Redis running in test mode ✅');
  const RedisMock = require('ioredis-mock');
  redisClient = new RedisMock();

  redisClient.setEx = async (key: string, seconds: number, value: string) => {
    await redisClient.set(key, value);
    await redisClient.expire(key, seconds);
  };
} else {
  redisClient = createClient({
    url: config.redis.url,
  });

  redisClient.on('error', (err: Error) => {
    console.error('Redis error ❌:', err);
  });

  redisClient.on('connect', () => {
    console.log('✅ Redis connected');
  });
}

export { redisClient };
