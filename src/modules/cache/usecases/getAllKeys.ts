import { redisClient } from '../../../shared/database/redis';

export const getAllCacheKeysUseCase = async (): Promise<string[]> => {
  const keys = await redisClient.keys('*');
  return keys;
};
