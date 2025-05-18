import { config } from '../../../shared/config/config';
import { findOrderStatusById } from '../orders.repository';
import { redisClient } from '../../../shared/database/redis';

const TTL_SECONDS = config.redis.ttlSeconds;

export const getOrderStatusUseCase = async (orderId: number): Promise<string> => {
  const redisKey = `order:${orderId}:status`;

  const cached = await redisClient.get(redisKey);
  if (cached) {
    console.log('Cached status 🚀: ', cached);
    return cached
  };

  const status = await findOrderStatusById(orderId);

  await redisClient.setEx(redisKey, TTL_SECONDS, status);
  console.log('Set status in cache 👍🏻:', status);

  return status;
};
