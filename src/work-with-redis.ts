// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

import redis from 'redis';

export async function manageRedis(): Promise<void> {
  const client = redis.createClient();

  client.on('error', (err: Error) => {
    console.error('Redis Client Error:', err);
  });

  try {
    const key = 'key';
    const value = 'value';

    await new Promise<void>((resolve, reject) => {
      client.set(key, value, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Saved: ${key} -> ${value}`);
          resolve();
        }
      });
    });

    await new Promise<void>((resolve, reject) => {
      client.get(key, (err: Error | null, reply: string) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Value for ${key}: ${reply}`);
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error in manageRedis:', error);
  } finally {
    client.quit();
  }
}