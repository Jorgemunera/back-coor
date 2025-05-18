export const generateCacheKey = (
  prefix: string,
  filters: Record<string, any>
): string => {
  const str = prefix + JSON.stringify(filters);
  return `cache:${Buffer.from(str).toString('base64')}`;
};
