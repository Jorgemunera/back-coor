import { redisClient } from '../../../shared/database/redis';

export const clearOrderStatusCacheUseCase = async (): Promise<number> => {
  const keys = await redisClient.keys('order:*:status');

  if (keys.length > 0) {
    await redisClient.del(keys);
    console.log(`🧹 Order status cache cleared: ${keys.length} keys deleted`);
  }

  return keys.length;
};
