import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => {
  console.error('Redis error:', err);
});

const connectClient = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

const getCache = async (key: string): Promise<string | null> => {
  await connectClient();
  try {
    const data = await client.get(key);
    return data;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
};

const setCache = async (key: string, value: string, expiration: number) => {
  await connectClient();
  try {
    await client.setEx(key, expiration, value);
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export { getCache, setCache };
