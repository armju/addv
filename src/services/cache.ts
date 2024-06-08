import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const getCache = (key: string): string | null => {
  const value = cache.get(key);
  if (value) {
    return value as string;
  }
  return null;
};

const setCache = (key: string, value: string, expiration: number) => {
  cache.set(key, value, expiration);
};

export { getCache, setCache };
