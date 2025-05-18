import { redisClient } from '../../../shared/database/redis';
import { getOrdersReport } from '../reports.repository';
import { generateCacheKey } from '../../../shared/utils/generateCacheKeys';
import { OrderReportFilters, OrderReportResult } from '../types';
import { config } from '../../../shared/config/config';

const TTL_SECONDS = config.redis.ttlSeconds;

export const getReportsUseCase = async (
  filters: OrderReportFilters
): Promise<OrderReportResult> => {
  const cacheKey = generateCacheKey('report:orders', filters);

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log(`Cached report 🚀: ${cacheKey}`);
    return JSON.parse(cached);
  }

  const report = await getOrdersReport(filters);

  await redisClient.setEx(cacheKey, TTL_SECONDS, JSON.stringify(report));
  console.log(`Set report in cache 👍🏻: ${cacheKey}`);

  return report;
};
