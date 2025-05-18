import { redisClient } from '../../../shared/database/redis';

export const clearReportsCacheUseCase = async (): Promise<number> => {
  const keys = await redisClient.keys('cache:*');

  if (keys.length > 0) {
    await redisClient.del(keys);
    console.log(`🧹 Report cache cleared: ${keys.length} keys deleted`);
  }

  return keys.length;
};
